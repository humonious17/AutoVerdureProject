import { db } from "@/pages/api/firebaseAdmin";

const VALID_STATUSES = ["pending", "processing", "completed", "cancelled"];

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { orderId, status } = req.body;

    // Validate required fields
    if (!orderId || !status) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Missing required fields: orderId or status",
      });
    }

    // Validate status value
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    // Get the order to verify it exists and check current status
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        error: "Not Found",
        message: `Order with ID ${orderId} not found`,
      });
    }

    const orderData = orderDoc.data();

    // Prevent invalid status transitions (optional - uncomment if needed)
    // const invalidTransition = checkInvalidStatusTransition(orderData.orderStatus, status);
    // if (invalidTransition) {
    //   return res.status(400).json({
    //     error: "Bad Request",
    //     message: invalidTransition
    //   });
    // }

    // Update the order status
    await orderRef.update({
      orderStatus: status,
      updatedAt: new Date(),
      statusHistory: [
        ...(orderData.statusHistory || []),
        {
          status,
          timestamp: new Date(),
          // Add user info if available
          // updatedBy: req.user?.email || 'system'
        },
      ],
    });

    res.status(200).json({
      message: "Order status updated successfully",
      data: {
        orderId,
        status,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update order status",
      // Only send error details in development
      ...(process.env.NODE_ENV === "development" && { details: error.message }),
    });
  }
}

// Utility function to check invalid status transitions (optional)
function checkInvalidStatusTransition(currentStatus, newStatus) {
  // Example rules - modify according to your business logic
  const invalidTransitions = {
    completed: ["processing", "pending"], // Can't move back from completed
    cancelled: ["processing", "completed"], // Can't move from cancelled to processing/completed
  };

  if (invalidTransitions[currentStatus]?.includes(newStatus)) {
    return `Cannot change order status from ${currentStatus} to ${newStatus}`;
  }

  return null;
}
