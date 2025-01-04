import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Star, Quote } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="w-full md:w-1/3 flex-shrink-0 px-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full mx-auto relative group">
        {/* Quote Icon */}
        <div className="absolute top-4 right-4 text-gray-200 opacity-50 group-hover:opacity-100 transition-opacity">
          <Quote size={40} strokeWidth={1} />
        </div>

        {/* Rating and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? "text-primaryMain" : "text-gray-300"
                }`}
                fill={i < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            {review.date || "2 days ago"}
          </span>
        </div>

        {/* Review Content */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl text-gray-800">
            {review.title || "Best on the market"}
          </h3>

          <div className="flex flex-col sm:flex-row gap-6">
            {review.imageUrl && (
              <div className="w-full sm:w-36 h-36 relative group">
                <Image
                  src={review.imageUrl}
                  alt={review.productName || "Product Image"}
                  fill
                  className="rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <div className="flex-1">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {review.comment ||
                  "I love the product because the support is great!"}
              </p>
              <div className="flex items-center space-x-3">
                {review.userAvatar && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primaryMain transition-all">
                    <Image
                      src={review.userAvatar}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-sm font-medium text-gray-800">
                  {review.userName || "Anonymous"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewSlider = ({ reviews }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelView, setIsPanelView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPanelView(window.innerWidth >= 768); // 768px is the md breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesPerView = isPanelView ? 3 : 1;
  const maxSlides = Math.ceil(reviews.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
        }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`bg-gray-100 rounded-full p-2 transition-colors ${
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex space-x-2">
          {[...Array(maxSlides + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primaryMain w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === maxSlides}
          className={`bg-gray-100 rounded-full p-2 transition-colors ${
            currentSlide === maxSlides
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const Testimonials = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?productId=${productId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryMain" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center min-h-[200px] text-red-500">
        Error loading reviews
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full py-8 flex justify-center items-center text-gray-500">
        No reviews available for this product
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFBF7] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <ReviewSlider reviews={reviews} />
      </div>
    </div>
  );
};

export default Testimonials;
