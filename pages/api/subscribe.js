import { db } from "./firebaseAdmin";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const docRef = await db.collection("subscribers").add({
      email,
      subscribedAt: new Date(),
    });

    return res.status(200).json({
      message: "Subscription successful",
      id: docRef.id,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error adding document: " + error.message,
    });
  }
}
