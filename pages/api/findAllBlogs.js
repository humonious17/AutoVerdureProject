import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const snapshot = await db
        .collection("blogs")
        .orderBy("createdAt", "desc")
        .get();
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Error fetching blogs" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await db.collection("blogs").doc(id).delete();
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ error: "Error deleting blog" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const updateData = req.body;
      await db
        .collection("blogs")
        .doc(id)
        .update({
          ...updateData,
          updatedAt: new Date().toISOString(),
        });
      res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Error updating blog" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
