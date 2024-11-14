import { db } from "/pages/api/firebaseAdmin";
import crypto from "crypto";
import { serialize } from "cookie";
import * as formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

function setCookie(res, sessionToken) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  };

  res.setHeader(
    "Set-Cookie",
    serialize("sessionToken", sessionToken, cookieOptions)
  );
}

async function addUserSession(userDetails) {
  let userData = {
    username: userDetails.name,
    email: userDetails.email,
    phone: userDetails.phone,
    hashedPassword: userDetails.hashedPassword,
    sessionToken: createSessionToken(),
    avPoints: userDetails.avPoints || 0,
  };

  try {
    const userQuerySnapshot = await db
      .collection("users")
      .doc(userDetails.email)
      .get();

    if (userQuerySnapshot.exists) {
      await db.collection("users").doc(userDetails.email).update(userData);
    } else {
      userData["admin"] = false;
      await db.collection("users").doc(userDetails.email).set(userData);
    }
    return userData.sessionToken;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }

      const { username, email, phone, hashedPassword } = fields;

      const userDetails = {
        name: username[0],
        email: email[0],
        phone: phone[0],
        hashedPassword: hashedPassword[0],
        avPoints: 0,
      };

      const sessionToken = await addUserSession(userDetails);

      if (!sessionToken) {
        res
          .status(401)
          .json({ error: "Something went wrong while adding session" });
      } else {
        setCookie(res, sessionToken);
        res.status(200).json({ message: "Session created successfully" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
