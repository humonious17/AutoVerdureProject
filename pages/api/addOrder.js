import { admin, db } from "@/pages/api/firebaseAdmin";
import crypto from "crypto";
import currentUser from "@/lib/server/currentUser";

async function addOrder(orderData) {
  try {
    const { orderId, products, shipping, email, totalAmount, paymentStatus } =
      orderData;
    // Ensure all fields are defined
    const shippingData = {
      city: shipping.city || "",
      state: shipping.state || "",
      postalCode: shipping.postalCode || "",
      country: shipping.country || "",
    };

    // Log the data being submitted to Firestore
    console.log("Order Data:", {
      orderId,
      products,
      shipping: shippingData,
      email,
      totalAmount,
      paymentStatus,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection("orders").doc(orderId).set({
      orderId,
      products,
      shipping: shippingData,
      email,
      totalAmount,
      paymentStatus,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error adding order:", error);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const orderData = req.body;
    const result = await addOrder(orderData);

    if (result) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(500)
        .json({ error: "Something went wrong while adding the order" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
