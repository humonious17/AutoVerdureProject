import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated, config } from "react-spring";
import {
  ChevronUp,
  ChevronDown,
  Heart,
  Share2,
  ShoppingCart,
  ChevronDown as ExpandIcon,
  X,
} from "lucide-react";
import Link from "next/link";

const TikTokProductView = ({ products, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const containerRef = useRef(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Spring animation for drag feedback
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 30 },
  }));

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientY;
    const diff = touchStart - currentTouch;

    // Limit the drag distance
    const boundedDiff = Math.max(Math.min(diff, 200), -200);
    setDragY(boundedDiff);

    // Animate the current view with spring physics
    api.start({
      y: -boundedDiff,
      immediate: false,
      config: { tension: 300, friction: 30 },
    });

    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50;
    const isSwipeDown = distance < -50;

    // Reset drag state
    setIsDragging(false);
    setDragY(0);

    // Animate back to center with spring physics
    api.start({
      y: 0,
      immediate: false,
      config: { tension: 200, friction: 20 },
    });

    if (isSwipeUp && currentIndex < products.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (isSwipeDown && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Enhanced slide animation with spring physics
  const slideAnimation = {
    initial: {
      opacity: 0,
      scale: 1.1,
      y: 100,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
        y: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -100,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // React Spring animation for description expansion
  const descriptionAnimation = useSpring({
    maxHeight: isDescriptionExpanded ? "200px" : "48px",
    config: config.stiff,
  });

  // Enhanced toast animation
  const toastAnimation = useSpring({
    opacity: showAddedToCart ? 1 : 0,
    transform: showAddedToCart
      ? "translate(-50%, 0) scale(1)"
      : "translate(-50%, 20px) scale(0.9)",
    config: config.wobbly,
  });

  const handleAddToCart = async () => {
    const currentProduct = products[currentIndex];

    if (isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: currentProduct.productId,
          productColor: currentProduct.defaultColor || "default",
          productSize: currentProduct.defaultSize || "default",
          productQuantity: 1,
          productPrice: currentProduct.productPrice,
          productName: currentProduct.productName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await response.json();

      // Show success toast
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
    } catch (error) {
      // Show error toast
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const currentProduct = products[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-40 overflow-hidden"
    >
      <div
        ref={containerRef}
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            {...slideAnimation}
            style={{
              height: "100%",
              position: "relative",
              touchAction: "none",
            }}
            className="relative h-full w-full flex flex-col"
          >
            {/* Close Button - Adjusted position */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 left-4 z-50 text-white bg-black/50 backdrop-blur-sm rounded-full p-2
                         hover:bg-black/70 transition-colors mt-[70px] opacity-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main Product Content */}
            <animated.div
              className="relative h-full w-full"
              style={{ transform: y.to((val) => `translateY(${val}px)`) }}
            >
              {/* Product Image with Enhanced Vignette */}
              <div className="absolute inset-0">
                <motion.img
                  src={currentProduct.images[0].publicUrl || "/placeholder.jpg"}
                  alt={currentProduct.productName}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Enhanced Vignette Effect with multiple layers */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Drag Indicator - Visual feedback for dragging */}
              {isDragging && (
                <motion.div
                  className="absolute inset-x-0 top-1/2 flex justify-center items-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                    {dragY > 0
                      ? "Release to go previous"
                      : "Release to go next"}
                  </div>
                </motion.div>
              )}

              {/* Rest of the component remains the same */}
              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold mb-2"
                >
                  {currentProduct.productName}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg mb-2"
                >
                  Rs. {currentProduct.productPrice}
                </motion.p>

                {/* Expandable Description */}
                <div className="relative mb-4">
                  <animated.div
                    style={descriptionAnimation}
                    className="overflow-hidden"
                  >
                    <p className="text-sm">
                      {currentProduct.productDescription}
                    </p>
                  </animated.div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="flex items-center gap-1 text-sm text-gray-300 mt-1"
                  >
                    {isDescriptionExpanded ? "Show less" : "Show more"}
                    <ExpandIcon
                      className={`w-4 h-4 transition-transform ${
                        isDescriptionExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                  <Link
                    href={`/store/${currentProduct.category}/${currentProduct.productId}`}
                    className="bg-white text-black px-6 py-2 rounded-full font-medium flex-1 text-center 
                             transition-all active:scale-95 hover:bg-gray-100 hover:shadow-lg"
                  >
                    View Details
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="bg-purple-600 px-6 py-2 rounded-full font-medium flex-1
                             hover:bg-purple-700 transition-all hover:shadow-lg"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>

              {/* Side Actions */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? "bg-red-500" : "bg-white bg-opacity-20"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "fill-white" : ""
                    } text-white`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white bg-opacity-20 rounded-full"
                >
                  <Share2 className="w-6 h-6 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white bg-opacity-20 rounded-full"
                >
                  <ShoppingCart className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Navigation Indicators */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    currentIndex > 0 && setCurrentIndex((prev) => prev - 1)
                  }
                  className={`p-1 ${
                    currentIndex === 0 ? "text-gray-400" : "text-white"
                  }`}
                >
                  <ChevronUp className="w-6 h-6" />
                </motion.button>
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1}/{products.length}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    currentIndex < products.length - 1 &&
                    setCurrentIndex((prev) => prev + 1)
                  }
                  className={`p-1 ${
                    currentIndex === products.length - 1
                      ? "text-gray-400"
                      : "text-white"
                  }`}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Enhanced Toast Animation */}
              <animated.div
                style={toastAnimation}
                className="absolute top-4 left-1/2 bg-white text-black px-4 py-2 rounded-full
                         shadow-lg text-sm font-medium backdrop-blur-sm"
              >
                Added to Cart! 🛍️
              </animated.div>
            </animated.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TikTokProductView;
