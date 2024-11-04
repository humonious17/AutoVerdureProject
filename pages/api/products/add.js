import { db } from '@/pages/api/firebaseAdmin';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { productData, productId } = req.body;

            // Use `doc(docId).set()` to create a document with a specific ID
            await db.collection("products").doc(productId).set(productData);

            res.status(200).json({ message: "Product added successfully with specified ID" });
        } catch (error) {
            console.error("Error adding product: ", error);
            res.status(500).json({ message: "Failed to add product" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
