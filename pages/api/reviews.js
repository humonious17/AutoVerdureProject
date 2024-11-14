import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const reviewsRef = db.collection("reviews");
    const snapshot = await reviewsRef.get();
    
    const reviews = [];
    snapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ 
      message: "Error fetching reviews", 
      error: error.message 
    });
  }
}