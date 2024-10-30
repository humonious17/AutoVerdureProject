import { db } from '@/pages/api/firebaseAdmin'; // Import your Firebase setup
export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const productData = req.body;
        await db.collection("products").add(productData);
        res.status(200).json({ message: "Product added successfully" });
      } catch (error) {
        console.error("Error adding product: ", error);
        res.status(500).json({ message: "Failed to add product" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }