import { admin, db } from "@/pages/api/firebaseAdmin";
import currentUser from "@/lib/server/currentUser";

async function addOrder(orderData) {
  try {
    const {
      orderId,
      products,
      shipping,
      email,
      totalAmount,
      paymentStatus = "pending",
      orderStatus = "pending",
      status = "pending",
    } = orderData;

    if (!orderId || !products || !shipping || !email) {
      throw new Error("Missing required order fields");
    }

    // Normalize shipping data
    const shippingData = {
      fullName: shipping.fullName || "",
      address1: shipping.address1 || "",
      address2: shipping.address2 || "",
      city: shipping.city || "",
      state: shipping.state || "",
      postalCode: shipping.postalCode || "",
      country: shipping.country || "",
      phone: shipping.phone || "",
    };

    // Create order document
    const orderDoc = {
      orderId,
      products: products.selectedProducts || [],
      shipping: shippingData,
      email,
      totalAmount,
      paymentStatus,
      orderStatus,
      status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Add order to Firestore
    await db.collection("orders").doc(orderId).set(orderDoc);

    // If order is completed, clear cart
    if (paymentStatus === "completed") {
      // Clear cart logic here if needed
    }

    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error(error.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const orderData = req.body;

    // Basic validation
    if (
      !orderData.orderId ||
      !orderData.products ||
      !orderData.shipping ||
      !orderData.email
    ) {
      return res.status(400).json({
        error: "Missing required order fields",
      });
    }

    const result = await addOrder(orderData);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Order processing error:", error);

    return res.status(500).json({
      error: "Failed to process order",
      details: error.message,
    });
  }
}
