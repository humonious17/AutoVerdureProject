import { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; // Adjust the path as needed

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/addblogs'); // Fetch from your API route
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
}
