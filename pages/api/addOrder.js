import { db } from "@/pages/api/firebaseAdmin";
import crypto from "crypto";
import currentUser from "@/lib/server/currentUser";

async function addOrder(payload, req) {
  const user = await currentUser(req);
  if (!user) {
    throw new Error("User not authenticated");
  }

  const products = [];
  payload.products.forEach((element) => {
    const product = {
      productId: element.productId,
      productName: element.productName,
    };
    products.push(product);
  });

  const orderId = crypto.randomBytes(8).toString("hex");
  let date = Date().split(" ");
  date.splice(4, 5);

  const data = {
    orderId: orderId,
    ordererEmail: user.email, // Using email from current user
    orderedProducts: products,
    shippingAddress: payload.shippingAddress,
    orderTime: date.join(" "),
    orderStatus: "Processing",
  };

  try {
    await db.collection("orders").doc(orderId).set(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const orderPayload = req.body;
      console.log(orderPayload);
      const result = await addOrder(orderPayload, req);
      if (result) {
        return res.status(200).json({ message: "Order created" });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
