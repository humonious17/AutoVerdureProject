// pages/api/getProducts.js

import updateProductsCache from "@/lib/server/updateProductsCache";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const productData = await updateProductsCache();

      if (!productData) {
        return res.status(500).json({ error: "Failed to fetch product data." });
      }

      // Flatten product data by combining different types into one array
      const allProducts = [
        ...productData.plants,
        ...productData.zenpot,
        ...productData.grobox,
        ...productData.accessory,
      ];

      res.status(200).json({ products: allProducts });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
