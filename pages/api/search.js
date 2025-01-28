import { db } from "./firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const results = await searchProducts(searchQuery);
    return res.status(200).json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function searchProducts(searchQuery) {
  // Convert search query to lowercase for case-insensitive search
  const searchLower = searchQuery.toLowerCase();

  try {
    const productsSnapshot = await db.collection("products").get();

    const results = [];

    productsSnapshot.forEach((doc) => {
      const data = doc.data();

      // Check if the search term matches either product name or description
      const nameMatch =
        data.productName &&
        data.productName.toLowerCase().includes(searchLower);
      const descriptionMatch =
        data.productDescription &&
        data.productDescription.toLowerCase().includes(searchLower);

      if (nameMatch || descriptionMatch) {
        results.push({
          productId: doc.id,
          productName: data.productName,
          productType: data.productType,
          description: data.productDescription, // Include description in results
          url: `/store/${data.productType}/${doc.id}`,
          // Add a relevance indicator to show where the match was found
          matchedFields: {
            name: nameMatch,
            description: descriptionMatch,
          },
        });
      }
    });

    return results;
  } catch (error) {
    console.error("Firestore query error:", error);
    throw error;
  }
}
