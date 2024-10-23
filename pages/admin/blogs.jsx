import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch existing blogs from the API
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBlog({ ...newBlog, image: file });
      setImagePreview(URL.createObjectURL(file)); // Show a preview of the image
    }
  };

  const handleContentChange = (content) => {
    setNewBlog({ ...newBlog, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    if (newBlog.image) {
      formData.append('image', newBlog.image);
    }

    const res = await fetch('/api/blogs', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const blog = await res.json();
      setBlogs([...blogs, blog]);
      setNewBlog({ title: '', content: '', image: null });
      setImagePreview(null); // Clear image preview after submission
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
          <label className="block text-sm font-medium text-gray-700">Attach Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Image Preview" className="w-48 h-48 object-cover" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Blogs</h2>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="mb-4 p-4 border-b">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
              {blog.image && (
                <div className="mt-2">
                  <img src={blog.image} alt={blog.title} className="w-48 h-48 object-cover" />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}
