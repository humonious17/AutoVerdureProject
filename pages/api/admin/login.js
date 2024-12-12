import { db } from "@/pages/api/firebaseAdmin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Debug: Log the incoming email
    console.log("Attempting login with email:", email);

    // Use Firebase Admin SDK to query the admins collection
    const adminsRef = db.collection("admin");
    const snapshot = await adminsRef.where("email", "==", email).get();

    // Debug: Log snapshot details
    console.log("Snapshot empty:", snapshot.empty);
    console.log("Number of docs:", snapshot.docs.length);

    if (snapshot.empty) {
      // Debug: List all admin users in the collection
      const allAdmins = await adminsRef.get();
      console.log("All admin users:");
      allAdmins.forEach((doc) => {
        console.log("Admin user:", doc.data());
      });

      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Get the first (and should be only) matching admin
    const adminDoc = snapshot.docs[0];
    const adminData = adminDoc.data();

    // Debug: Log admin data
    console.log("Found admin data:", adminData);

    // If the password is stored in plain text (not recommended), do a direct comparison
    if (password === adminData.password) {
      // Generate JWT token
      const token = jwt.sign(
        {
          email: adminData.email,
          id: adminDoc.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          email: adminData.email,
        },
      });
    }

    // If using hashed password (recommended for future)
    // Uncomment and use this if you implement password hashing
    // const isPasswordCorrect = await bcrypt.compare(password, adminData.hashedPassword);
    // if (isPasswordCorrect) { ... }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
