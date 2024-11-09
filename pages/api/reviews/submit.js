// pages/api/reviews/submit.js
import currentUser from "@/lib/server/currentUser";
import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Get current user from session
    const user = await currentUser(req);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { orderId, rating, comment, imageUrl } = req.body;

    console.log("Received review submission:", {
      orderId,
      rating,
      comment,
      imageUrl,
    });

    // Validate required fields
    if (!orderId || !rating) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Check if order exists and belongs to user
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      console.error("Order not found:", orderId);
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const orderData = orderDoc.data();
    /*
    console.log("Order data:", orderData);
    if (orderData.userEmail !== user.email) {
      res.status(403).json({ error: "Unauthorized access to order" });
      return;
    }*/

    // Check if review already exists
    const existingReview = await db
      .collection("reviews")
      .where("orderId", "==", orderId)
      .where("userEmail", "==", user.email)
      .get();

    if (!existingReview.empty) {
      res.status(400).json({ error: "Review already exists for this order" });
      return;
    }

    // Create review document
    const reviewData = {
      orderId,
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}` || "Anonymous",
      rating,
      comment: comment || "",
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString(),
      productId: orderData.products[0].productId,
      productName: orderData.products[0].productName,
    };

    // Add review to Firestore
    const reviewRef = await db.collection("reviews").add(reviewData);

    console.log("Review added with ID:", reviewRef.id);

    // Update order document with review status
    await orderRef.update({
      hasReview: true,
      reviewId: reviewRef.id,
    });

    // If product exists, update its average rating
    const productRef = db
      .collection("products")
      .doc(orderData.products[0].productId);
    const productDoc = await productRef.get();

    if (productDoc.exists) {
      const product = productDoc.data();
      console.log("Product data before update:", product);

      const newTotalRatings = (product.totalRatings || 0) + 1;
      const newTotalScore = (product.totalScore || 0) + rating;
      const newAverageRating = newTotalScore / newTotalRatings;

      console.log("New total ratings:", newTotalRatings);
      console.log("New total score:", newTotalScore);
      console.log("New average rating:", newAverageRating);

      await productRef.update({
        totalRatings: newTotalRatings,
        totalScore: newTotalScore,
        averageRating: newAverageRating,
      });

      console.log("Product data updated successfully");
    } else {
      console.error("Product not found:", orderData.products[0].productId);
    }

    res.status(200).json({
      success: true,
      reviewId: reviewRef.id,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Failed to submit review" });
  }
}
