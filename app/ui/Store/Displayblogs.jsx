import { useState, useEffect } from "react";
import BlogCard from "@/pages/Blogs/BlogCard";
import Link from "next/link";
import Image from "next/image";

export default function Blogs({ title, description }) {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/addblogs?limit=6");
        const data = await res.json();
        setBlogs(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < blogs.length - 1) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleNext = () => {
    if (windowWidth >= 1024) {
      if (currentIndex + 3 < blogs.length) {
        setCurrentIndex(currentIndex + 3);
      }
    } else {
      if (currentIndex < blogs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (windowWidth >= 1024) {
      if (currentIndex - 3 >= 0) {
        setCurrentIndex(currentIndex - 3);
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const isMobile = windowWidth < 1024;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-12 mt-10 text-center">
        <h2 className="text-4xl font-medium mb-8">{title}</h2>
        <p className="text-gray-600 max-w-4xl mx-auto mb-10">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((placeholder) => (
            <div key={placeholder} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-12 mt-10 text-center">
      <h2 className="text-4xl font-medium mb-8">{title}</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-10">{description}</p>

      <div className="relative group">
        {/* Navigation Arrows - Positioned absolutely */}
        {blogs.length > 0 && (
          <>
            <button
              onClick={handlePrevious}
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 z-10 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300 ease-in-out
                bg-gray-100 bg-opacity-50 hover:bg-opacity-80 
                p-2 rounded-full
                ${currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"}
              `}
              disabled={currentIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700 w-6 h-6"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-10 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300 ease-in-out
                bg-gray-100 bg-opacity-50 hover:bg-opacity-80 
                p-2 rounded-full
                ${
                  (isMobile && currentIndex === blogs.length - 1) ||
                  (!isMobile && currentIndex + 3 >= blogs.length)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
              disabled={
                (isMobile && currentIndex === blogs.length - 1) ||
                (!isMobile && currentIndex + 3 >= blogs.length)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700 w-6 h-6"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Blog Cards Container */}
        <div className="overflow-hidden">
          <div
            className={`${
              isMobile
                ? "flex transition-transform duration-300 ease-in-out w-full"
                : "grid grid-cols-3 gap-8"
            }`}
            style={
              isMobile
                ? {
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }
                : {}
            }
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            {isMobile
              ? // Mobile Layout
                blogs.map((blog) => (
                  <div
                    key={blog?.id || Math.random()}
                    className="w-full flex-shrink-0"
                  >
                    <BlogCard blog={blog} />
                  </div>
                ))
              : // Desktop Layout - Show only 3 items
                blogs.slice(currentIndex, currentIndex + 3).map((blog) => (
                  <div key={blog?.id || Math.random()}>
                    <BlogCard blog={blog} />
                  </div>
                ))}
          </div>
        </div>

        {/* Navigation Dots for Mobile */}
        {isMobile && blogs.length > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {blogs.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Explore More Button */}
      <div className="flex justify-center mt-10">
        <div className="w-fit px-10 py-4 text-base font-normal border border-primaryGrayscale rounded-full cursor-pointer">
          <Link href="/resources">Explore More</Link>
        </div>
      </div>
    </div>
  );
}
