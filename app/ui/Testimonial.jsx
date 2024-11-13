/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Image from "next/image";

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-gray-500">
        No testimonials available for this product
      </div>
    );
  }

  return (
    <div className="w-full px-11 sm:px-5 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[560px] w-full flex flex-col gap-y-3 sm:text-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          What Our Customers Say
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
          Read testimonials from our satisfied customers
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="mt-8 max-w-[800px] w-full">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex flex-col items-center text-center">
            {testimonials[currentIndex]?.imageUrl && (
              <div className="w-20 h-20 mb-4 relative rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentIndex].imageUrl}
                  alt={testimonials[currentIndex].userName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-lg font-medium mb-2">
              {testimonials[currentIndex]?.userName || "Anonymous"}
            </p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < (testimonials[currentIndex]?.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 italic mb-6">
              "{testimonials[currentIndex]?.comment}"
            </p>
            <p className="text-sm text-gray-500">
              {new Date(
                testimonials[currentIndex]?.createdAt?.toDate()
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={previousTestimonial}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
