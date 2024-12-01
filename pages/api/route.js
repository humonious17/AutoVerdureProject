import findAllProducts from "./products/findAllProducts";
export default async function handler(req, res) {
  try {
    // Extract product type from query parameters, default to 'plant' if not specified
    const productType = req.query.type || "plants" || "flowers" || "planters" || "accessory";

    // Fetch products using findAllProducts
    const products = await findAllProducts(productType);

    // Return products as JSON response
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
}
