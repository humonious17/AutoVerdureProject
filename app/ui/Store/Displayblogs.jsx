import { useState, useEffect } from 'react';
import BlogCard from '@/pages/Blogs/BlogCard'; // Adjust the path as needed
import Link from 'next/link';

// Accept title and description as props
export default function Blogs({ title, description }) {
  const [blogs, setBlogs] = useState([]);
  const visibleBlogs = 3; // Set to show only 3 blogs

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
    <div className="container mx-auto p-12 text-center">
      <h2 className="text-4xl font-medium mb-4">{title}</h2> {/* Use title prop */}
      <p className="text-gray-600 max-w-4xl mx-auto mb-10 line-clamp-2">
        {description} {/* Use description prop */}
      </p>
      
      {/* Adjusted grid classes for responsive behavior */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Centered Explore More Button */}
      <div className="flex justify-center mt-10">
        <div className="w-fit px-10 py-4 text-base font-normal border border-primaryGrayscale rounded-full cursor-pointer">
          <Link href="/resources">Explore More</Link>
        </div>
      </div>
    </div>
  );
}
