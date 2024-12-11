// pages/api/auth/login.js
import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Check if the email and password exist in the "admins" collection
      const adminSnapshot = await db
        .collection("admin")
        .where("email", "==", email)
        .where("password", "==", password)
        .get();

      if (!adminSnapshot.empty) {
        // Allow access
        res.status(200).json({ message: "Authentication successful" });
      } else {
        // Deny access
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error authenticating admin:", error);
      res
        .status(500)
        .json({ message: "An error occurred during authentication" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
