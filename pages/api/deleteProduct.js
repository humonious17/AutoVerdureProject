// pages/api/deleteProduct.js

import { db } from "/pages/api/firebaseAdmin";

export default async function handler(req, res) {
    if (req.method === "DELETE") {
        const { id } = req.query;

        try {
            console.log("Attempting to delete product with ID:", id);
            // Ensure 'id' matches the Document ID in Firestore's 'products' collection
            await db.collection('products').doc(id).delete();
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ error: "Failed to delete product" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
