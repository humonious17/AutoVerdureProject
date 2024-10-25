import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

let blogs = []; // Temporary in-memory storage for blog posts

export const config = {
  api: {
    bodyParser: false, // Disables body parsing by Next.js since we are using formidable
  },
};

// Helper function to parse form data with a promise
const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/uploads'), // Directory to save uploaded images
      keepExtensions: true, // Keep file extensions
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse form data using the promise helper
      const { fields, files } = await parseForm(req);
      const { title, description, content } = fields; // Include description in fields

      if (!title|| !description || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const newBlog = {
        id: blogs.length + 1,
        title,
        description, // Store description in the blog post
        content,
        date: new Date().toISOString(),
      };

      if (files.image) {
        // Store the image and get the file path
        const imagePath = `/uploads/${path.basename(files.image.filepath)}`;
        newBlog.image = imagePath; // Save image path in blog post data
      }

      blogs.push(newBlog);
      return res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error parsing form:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    // Fetch all blogs
    return res.status(200).json(blogs);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
