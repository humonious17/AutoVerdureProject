import { useState, useEffect } from "react";
import Mainblog from "./Mainblog";
import BlogCard from "./BlogCard";

const Blogs = ({ selectedCategory }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/addblogs");
        const data = await res.json();
        setBlogs(data);
        filterBlogs(data, selectedCategory);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Initial fetch

  useEffect(() => {
    filterBlogs(blogs, selectedCategory);
  }, [selectedCategory]); // Re-filter when category changes

  const filterBlogs = (blogData, category) => {
    if (category === "all") {
      setFilteredBlogs(blogData);
    } else {
      const filtered = blogData.filter(
        (blog) => blog.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  };

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (filteredBlogs.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-lg text-gray-600">
          No blogs found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Main Blog - First one from filtered list */}
      {filteredBlogs.length > 0 && <Mainblog blog={filteredBlogs[0]} />}

      {/* Rest of the filtered blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
        {filteredBlogs.slice(1).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
