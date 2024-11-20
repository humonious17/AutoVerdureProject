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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/addblogs?limit=6");
        const data = await res.json();
        setBlogs(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching blogs:", error);
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

  // Handle touch events for mobile swipe
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
      // Desktop behavior - move 3 at a time
      if (currentIndex + 3 < blogs.length) {
        setCurrentIndex(currentIndex + 3);
      }
    } else {
      // Mobile behavior - move 1 at a time
      if (currentIndex < blogs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (windowWidth >= 1024) {
      // Desktop behavior - move 3 at a time
      if (currentIndex - 3 >= 0) {
        setCurrentIndex(currentIndex - 3);
      }
    } else {
      // Mobile behavior - move 1 at a time
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // Determine display mode based on screen size
  const isMobile = windowWidth < 1024;
  const blogsToShow = isMobile ? 1 : 3;

  return (
    <div className="container mx-auto p-4 md:p-12 mt-10 text-center">
      <h2 className="text-4xl font-medium mb-8">{title}</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-10">{description}</p>

      {/* Blog Cards Container */}
      <div className="relative overflow-hidden">
        <div
          className={`${
            isMobile
              ? "flex transition-transform duration-300 ease-in-out"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`${
                isMobile ? "w-full flex-shrink-0 px-4" : "flex-none"
              }`}
              style={
                isMobile
                  ? {
                      display: index === currentIndex ? "block" : "block",
                    }
                  : {}
              }
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        {/* Navigation Dots for Mobile */}
        {isMobile && (
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

        {/* Navigation Arrows */}
        <div className="mt-8 w-full flex gap-10 justify-center items-center">
          <Image
            src="/leftArrow1.svg"
            alt="Scroll left"
            width={13}
            height={26}
            onClick={handlePrevious}
            className={`cursor-pointer ${
              currentIndex === 0 ? "opacity-50" : ""
            }`}
          />
          <Image
            src="/rightArrow1.svg"
            alt="Scroll right"
            width={13}
            height={26}
            onClick={handleNext}
            className={`cursor-pointer ${
              (isMobile && currentIndex === blogs.length - 1) ||
              (!isMobile && currentIndex + 3 >= blogs.length)
                ? "opacity-50"
                : ""
            }`}
          />
        </div>
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
