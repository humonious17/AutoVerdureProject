import { useState, useEffect } from 'react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
  <li key={blog.id} className="mb-4 p-4 border-b flex">
    <div className="mr-4">
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-48 h-48 object-cover" />
      )}
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-semibold">{blog.title}</h3>
      <p className="text-gray-600">{blog.description}</p> {/* This line displays the description */}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  </li>
))}

        </ul>
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}
