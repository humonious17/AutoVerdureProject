import { useState, useEffect } from "react";
import Mainblog from "./Mainblog"; // Import MainBlog component
import BlogCard from "./BlogCard"; // Import BlogCard component

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/addblogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div>
          {/* Main Blog - First one */}
          {blogs.length > 0 && <Mainblog blog={blogs[0]} />}
          {/* The Rest of the Blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            {blogs.slice(1).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
