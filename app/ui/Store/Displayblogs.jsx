import { useState, useEffect } from 'react';
import BlogCard from '@/pages/Blogs/BlogCard'; // Adjust the path as needed
import Link from 'next/link';
import Image from 'next/image';

export default function Blogs({ title, description }) {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for pagination
  const [windowWidth, setWindowWidth] = useState(0); // Track window width for responsiveness

  useEffect(() => {
    // Fetch the blogs on component mount
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

    // Update window width on client side
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Make sure to run this only in the client-side
    if (typeof window !== 'undefined') {
      // Initial window width check
      handleResize();
      // Attach resize event listener
      window.addEventListener('resize', handleResize);
    }

    // Cleanup event listener on unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Show next 3 blogs for large screens
  const handleNext = () => {
    if (currentIndex + 3 < blogs.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  // Show previous 3 blogs for large screens
  const handlePrevious = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  // Determine the number of blogs per row based on the window width
  let blogsPerRow = 6; // Default for small screens
  if (windowWidth >= 768) {
    blogsPerRow = 6; // Medium screens
  }
  if (windowWidth >= 1024) {
    blogsPerRow = 3; // Large screens
  }

  return (
    <div className=" mx-auto p-1 mt-10 text-center">
      <h2 className="text-4xl font-medium mb-8">{title}</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-10 ">
        {description}
      </p>

      {/* Blog Cards Container */}
      <div className="overflow-hidden relative">
        <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
          {blogs.slice(currentIndex, currentIndex + blogsPerRow).map((blog) => (
            <div key={blog.id} className="flex-none">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons for Large Screens */}
      {windowWidth >= 1024 && (
        <div className="mt-8 w-full flex gap-10 justify-center items-center">
          <Image
            src="/leftArrow1.svg"
            alt="Scroll left"
            width={13}
            height={26}
            onClick={handlePrevious}
            className="cursor-pointer"
          />
          <Image
            src="/rightArrow1.svg"
            alt="Scroll right"
            width={13}
            height={26}
            onClick={handleNext}
            className="cursor-pointer"
          />
        </div>
      )}

      {/* Centered Explore More Button */}
      <div className="flex justify-center mt-10">
        <div className="w-fit px-10 py-4 text-base font-normal border border-primaryGrayscale rounded-full cursor-pointer">
          <Link href="/resources">Explore More</Link>
        </div>
      </div>
    </div>
  );
}
