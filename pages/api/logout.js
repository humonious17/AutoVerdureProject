import { parse, serialize } from "cookie";
import { db } from "./firebaseAdmin"; // Assuming this initializes Firestore
import crypto from "crypto";

function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

function clearSessionCookie(res) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 0, // Immediately expire the cookie
  };

  res.setHeader("Set-Cookie", serialize("sessionToken", "", cookieOptions));
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const cookies = req.headers.cookie;

      if (cookies) {
        const { sessionToken } = parse(cookies);

        if (sessionToken) {
          // Clear session token from the cookie
          clearSessionCookie(res);

          // Find and invalidate the session token in Firestore
          const usersRef = db.collection("users");
          const querySnapshot = await usersRef
            .where("sessionToken", "==", sessionToken)
            .get();

          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              await doc.ref.update({ sessionToken: null });
            });
          }
        }
      }

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
