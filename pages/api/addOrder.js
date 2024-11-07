import { db } from "@/pages/api/firebaseAdmin";
import crypto from "crypto";
import currentUser from "@/lib/server/currentUser";

async function addOrder(payload, req) {
  const user = await currentUser(req);
  if (!user) {
    throw new Error("User not authenticated");
  }

  const orderId = crypto.randomBytes(8).toString("hex");

  // Enhanced order data structure
  const data = {
    orderId: orderId,
    razorpayOrderId: payload.razorpayOrderId || orderId, // For compatibility with existing UI
    receiptId: payload.receiptId || `RCPT-${orderId.substring(0, 6)}`,
    email: user.email,
    amount: payload.amount || 0,
    status: "pending",
    createdAt: new Date(),

    // Customer and shipping details
    shipping: {
      fullName: payload.shippingAddress.fullName,
      address1: payload.shippingAddress.address1,
      address2: payload.shippingAddress.address2,
      city: payload.shippingAddress.city,
      state: payload.shippingAddress.state,
      pinCode: payload.shippingAddress.pinCode,
      country: payload.shippingAddress.country,
      phone: payload.shippingAddress.phone,
    },

    // Product details
    items: payload.products.map((product) => ({
      productId: product.productId,
      name: product.productName,
      quantity: product.quantity || 1,
      price: product.price || 0,
      variant: product.productType || null,
      image: product.image || null,
    })),
  };

  try {
    await db.collection("orders").doc(orderId).set(data);
    return { success: true, orderId };
  } catch (error) {
    console.error("Error adding order:", error);
    return { success: false, error: error.message };
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await addOrder(req.body, req);
      if (result.success) {
        return res.status(200).json({
          message: "Order created",
          orderId: result.orderId,
        });
      } else {
        return res.status(500).json({
          message: "Failed to create order",
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
