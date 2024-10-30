import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, description, content, imageUrl, category } = req.body; // Get data from request body

      // Save the blog data to Firestore
      const docRef = await db.collection('blogs').add({
        title,
        description,
        content,
        imageUrl,
        category,
        createdAt: new Date().toISOString(),
      });

      res.status(200).json({ id: docRef.id, title, description, content, imageUrl, category });
    } catch (error) {
      console.error('Error adding blog:', error);
      res.status(500).json({ error: 'Error adding blog' });
    }
  } else if (req.method === 'GET') {
    try {
      const snapshot = await db.collection('blogs').orderBy('createdAt', 'desc').get();
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Error fetching blogs' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
