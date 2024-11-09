import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Blog ID is required" });
  }

  const blogRef = db.collection("blogs").doc(id);

  try {
    switch (req.method) {
      case "GET":
        const doc = await blogRef.get();
        if (!doc.exists) {
          return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
        break;

      case "PUT":
        const updateData = {
          ...req.body,
          updatedAt: new Date().toISOString(),
        };
        await blogRef.update(updateData);
        res.status(200).json({ message: "Blog updated successfully" });
        break;

      case "DELETE":
        await blogRef.delete();
        res.status(200).json({ message: "Blog deleted successfully" });
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Operation failed" });
  }
}
