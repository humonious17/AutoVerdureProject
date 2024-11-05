import { db } from "@/pages/api/firebaseAdmin";
import currentUser from "@/lib/server/currentUser";

async function getOrderDetails(orderId, userEmail) {
  try {
    // Get the order document
    const orderDoc = await db.collection("orders").doc(orderId).get();

    if (!orderDoc.exists) {
      throw new Error("Order not found");
    }

    const orderData = orderDoc.data();

    // Verify the order belongs to the requesting user
    if (orderData.ordererEmail !== userEmail) {
      throw new Error("Unauthorized access to order");
    }

    // Get product details for each ordered product
    const productPromises = orderData.orderedProducts.map(async (product) => {
      const productDoc = await db
        .collection("products")
        .doc(product.productId)
        .get();
      if (!productDoc.exists) {
        return {
          ...product,
          productType: "Unknown",
          productPrice: 0,
          productDescription: "Product details not found",
        };
      }
      const productData = productDoc.data();
      return {
        ...product,
        productType: productData.productType,
        productPrice: productData.price,
        productDescription: productData.description,
        productImage: productData.imageUrl,
      };
    });

    const productsWithDetails = await Promise.all(productPromises);

    // Calculate order totals
    const orderTotal = productsWithDetails.reduce(
      (sum, product) => sum + product.productPrice,
      0
    );

    return {
      orderId: orderData.orderId,
      ordererEmail: orderData.ordererEmail,
      orderTime: orderData.orderTime,
      orderStatus: orderData.orderStatus,
      shippingAddress: orderData.shippingAddress,
      products: productsWithDetails,
      orderTotal: orderTotal,
      paymentStatus: "Paid", // Assuming all orders are paid at creation
    };
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await currentUser(req);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { orderId } = req.query;
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const orderDetails = await getOrderDetails(orderId, user.email);
    return res.status(200).json(orderDetails);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(error.message === "Order not found" ? 404 : 500).json({
      message: error.message || "Failed to fetch order details",
    });
  }
}
