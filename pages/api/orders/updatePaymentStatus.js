import { db } from "@/pages/api/firebaseAdmin";

const VALID_PAYMENT_STATUSES = ["pending", "completed", "refunded"];

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { orderId, paymentStatus } = req.body;

    if (!orderId || !paymentStatus) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Missing required fields: orderId or paymentStatus",
      });
    }

    if (!VALID_PAYMENT_STATUSES.includes(paymentStatus)) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Invalid payment status. Must be one of: ${VALID_PAYMENT_STATUSES.join(
          ", "
        )}`,
      });
    }

    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        error: "Not Found",
        message: `Order with ID ${orderId} not found`,
      });
    }

    await orderRef.update({
      paymentStatus,
      updatedAt: new Date(),
      paymentStatusHistory: [
        ...(orderDoc.data().paymentStatusHistory || []),
        {
          status: paymentStatus,
          timestamp: new Date(),
        },
      ],
    });

    res.status(200).json({
      message: "Payment status updated successfully",
      data: {
        orderId,
        paymentStatus,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update payment status",
      ...(process.env.NODE_ENV === "development" && { details: error.message }),
    });
  }
}
