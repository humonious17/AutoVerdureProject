import { db } from "./firebaseAdmin";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  // Handle GET request
  if (req.method === "GET") {
    try {
      const subscribersSnapshot = await db
        .collection("subscribers")
        .orderBy("subscribedAt", "desc")
        .get();

      const subscribers = subscribersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        subscribedAt: doc.data().subscribedAt.toDate().toISOString(),
      }));

      return res.status(200).json({ subscribers });
    } catch (error) {
      return res.status(500).json({
        error: "Error fetching subscribers: " + error.message,
      });
    }
  }

  // Handle DELETE request
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          error: "Subscriber ID is required",
        });
      }

      await db.collection("subscribers").doc(id).delete();

      return res.status(200).json({
        message: "Subscriber deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error deleting subscriber: " + error.message,
      });
    }
  }

  // Handle unsupported HTTP methods
  return res.status(405).json({
    error: "Method not allowed",
  });
}
