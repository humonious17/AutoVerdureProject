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
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Verify user authentication
    const user = await currentUser(req);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
      res.status(400).json({ error: "Invalid product IDs" });
      return;
    }

    // Get products from Firestore
    const products = [];
    const productsRef = db.collection("products");

    // Use Promise.all to fetch all products in parallel
    const productPromises = productIds.map(async (productId) => {
      const productDoc = await productsRef.doc(productId).get();
      if (productDoc.exists) {
        return {
          id: productDoc.id,
          ...productDoc.data(),
        };
      }
      return null;
    });

    const productResults = await Promise.all(productPromises);
    const validProducts = productResults.filter(product => product !== null);

    res.status(200).json(validProducts);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
}
