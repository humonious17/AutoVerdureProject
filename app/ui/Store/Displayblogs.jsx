import { useState, useEffect, useRef } from 'react';
import BlogCard from '@/pages/Blogs/BlogCard'; // Adjust the path as needed
import Link from 'next/link';
import Image from 'next/image';

export default function Blogs({ title, description }) {
  const [blogs, setBlogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/addblogs?limit=6'); // Fetch 6 blogs
        const data = await res.json();
        setBlogs(data.slice(0, 6)); // Limit to 6 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Scroll Left Function
  const scrollLeft = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0].offsetWidth;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  // Scroll Right Function
  const scrollRight = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0].offsetWidth;
      containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto p-12 text-center">
      <h2 className="text-4xl font-medium mb-4">{title}</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-10 line-clamp-2">
        {description}
      </p>

      {/* Scrollable Blog Cards Container with Hidden Scroll Bar */}
      <div className="overflow-hidden relative">
        <div
          className="flex flex-col md:flex-row gap-4 overflow-x-auto no-scrollbar"
          ref={containerRef}
        >
          {blogs.map((blog) => (
            <div key={blog.id} className="flex-none w-full md:w-1/3">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Buttons */}
      <div className="mt-8 w-full flex gap-10 justify-center items-center">
        <Image
          src="/leftArrow1.svg"
          alt="Scroll left"
          width={13}
          height={26}
          onClick={scrollLeft}
          className="cursor-pointer"
        />
        <Image
          src="/rightArrow1.svg"
          alt="Scroll right"
          width={13}
          height={26}
          onClick={scrollRight}
          className="cursor-pointer"
        />
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
