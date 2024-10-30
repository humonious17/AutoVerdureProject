import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import Image from 'next/image';
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    selectedBlogId: '',
    category: '' // Added category field
  });

  const categories = ['Learning', 'Guides', 'Article']; // Example categories

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/addblogs');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleContentChange = (content) => {
    setNewBlog({ ...newBlog, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch('/api/addblogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify(newBlog), // Convert newBlog object to JSON string
    });
  
    if (res.ok) {
      const blog = await res.json();
      setBlogs([...blogs, blog]);
      setNewBlog({ title: '', description: '', content: '', imageUrl: '', selectedBlogId: '', category: '' }); // Reset form
    } else {
      console.error('Failed to submit the blog');
    }
  };
  
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Blogs</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={newBlog.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <ReactQuill
            theme="snow"
            value={newBlog.content}
            onChange={handleContentChange}
            className="mt-1"
            placeholder="Write your blog content here..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={newBlog.imageUrl}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={newBlog.category}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>


      
    </div>
    
  );
}
