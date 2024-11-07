import Razorpay from "razorpay";
import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { products, shippingDetails, email } = req.body;

    // Validate required data
    if (
      !products?.selectedProducts ||
      !Array.isArray(products.selectedProducts)
    ) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    if (!shippingDetails || !email) {
      return res
        .status(400)
        .json({ error: "Missing shipping details or email" });
    }

    // Calculate total amount
    let total = 0;
    const orderItems = products.selectedProducts.map((product) => {
      const itemTotal = parseInt(product.price) * parseInt(product.productQty);
      total += itemTotal;
      return {
        productId: product.productId,
        productName: product.productName,
        quantity: product.productQty,
        price: product.price,
        itemTotal,
      };
    });

    // Convert total to paise (Razorpay requires amount in smallest currency unit)
    const amountInPaise = total * 100;

    // Initialize Razorpay
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY_ID,
      key_secret: process.env.RAZORPAY_API_KEY_SECRET,
    });

    // Generate unique receipt ID
    const receiptId = `receipt_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create order in Razorpay
    const razorpayOrder = await instance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
      partial_payment: false,
      notes: {
        email: email,
        shipping_address: `${shippingDetails.streetName}, ${shippingDetails.houseNumber}, ${shippingDetails.city}`,
        customer_name: shippingDetails.fullName,
        phone: shippingDetails.phone,
      },
    });

    // Store order details in Firebase
    const orderRef = db.collection("orders").doc(razorpayOrder.id);
    await orderRef.set({
      orderStatus: "created",
      orderId: razorpayOrder.id,
      razorpayOrderId: razorpayOrder.id,
      receiptId,
      email,
      status: "created",
      amount: amountInPaise / 100,
      currency: "INR",
      createdAt: new Date(),
      items: orderItems,
      shipping: {
        fullName: shippingDetails.fullName,
        streetName: shippingDetails.streetName,
        houseNumber: shippingDetails.houseNumber,
        city: shippingDetails.city,
        phone: shippingDetails.phone,
        country: shippingDetails.country,
        zipCode: shippingDetails.zipCode,
      },
      payment: {
        status: "pending",
      },
    });

    return res.status(200).json({
      id: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);

    // Send appropriate error response based on error type
    if (error.statusCode) {
      // Razorpay specific errors
      return res.status(error.statusCode).json({
        error: error.error.description || "Razorpay error occurred",
      });
    }

    return res.status(500).json({
      error: "Failed to create order. Please try again.",
    });
  }
}
