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
  Music2,
  Sparkles,
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const containerRef = useRef(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const currentProduct = products[currentIndex];

  // Enhanced spring animation for smoother drag
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { tension: 350, friction: 35 },
  }));

  // New spring animation for image scale on load
  const imageAnimation = useSpring({
    scale: isImageLoaded ? 1 : 1.1,
    opacity: isImageLoaded ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  // New shimmer animation for loading state
  const shimmerAnimation = {
    hidden: { opacity: 0.5, x: -200 },
    visible: {
      opacity: 1,
      x: 200,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  // Enhanced touch handling with velocity tracking
  const velocityRef = useRef(0);
  const lastTouchRef = useRef(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
    setIsDragging(true);
    velocityRef.current = 0;
    lastTouchRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientY;
    const diff = touchStart - currentTouch;
    const timeDelta = e.timeStamp - lastTouchRef.current;

    // Calculate velocity
    velocityRef.current = (currentTouch - lastTouchRef.current) / timeDelta;
    lastTouchRef.current = currentTouch;

    // Enhanced boundaries with spring tension
    const resistance = Math.abs(diff) > 100 ? 0.5 : 1;
    const boundedDiff =
      Math.sign(diff) * Math.min(Math.abs(diff * resistance), 250);

    setDragY(boundedDiff);

    // Smoother animation with velocity
    api.start({
      y: -boundedDiff,
      immediate: false,
      config: {
        tension: 350 - Math.abs(boundedDiff),
        friction: 35 + Math.abs(boundedDiff) * 0.1,
      },
    });

    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const velocity = velocityRef.current;
    const isSwipeUp = distance > 50 || velocity < -0.5;
    const isSwipeDown = distance < -50 || velocity > 0.5;

    setIsDragging(false);
    setDragY(0);

    // Enhanced spring animation on release
    api.start({
      y: 0,
      immediate: false,
      config: {
        tension: 200,
        friction: 20,
        velocity: velocityRef.current * 2,
      },
    });

    if (isSwipeUp && currentIndex < products.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      triggerSparkleEffect();
    }
    if (isSwipeDown && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      triggerSparkleEffect();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // New sparkle effect
  const triggerSparkleEffect = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1000);
  };

  // Enhanced slide animation
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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.4 },
        scale: { duration: 0.5 },
        y: {
          type: "spring",
          stiffness: 350,
          damping: 30,
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -100,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Enhanced description animation
  const descriptionAnimation = useSpring({
    maxHeight: isDescriptionExpanded ? "200px" : "48px",
    config: {
      tension: 280,
      friction: 60,
    },
  });

  // Modern toast animation
  const toastAnimation = useSpring({
    opacity: showAddedToCart ? 1 : 0,
    transform: showAddedToCart
      ? "translate(-50%, 20px) scale(1)"
      : "translate(-50%, 0px) scale(0.9)",
    config: {
      tension: 320,
      friction: 32,
    },
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 overflow-hidden backdrop-blur-lg"
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
            className="relative h-full w-full flex flex-col"
          >
            {/* Enhanced Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 left-4 z-50 text-white bg-black/30 backdrop-blur-md 
                       rounded-full p-2 hover:bg-black/50 transition-all duration-300 
                       shadow-lg hover:shadow-xl mt-[env(safe-area-inset-top,70px)]"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main Content Container */}
            <animated.div
              className="relative h-full w-full"
              style={{ transform: y.to((val) => `translateY(${val}px)`) }}
            >
              {/* Enhanced Product Image with Loading State */}
              <div className="absolute inset-0 overflow-hidden">
                {!isImageLoaded && (
                  <motion.div
                    variants={shimmerAnimation}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 bg-gradient-to-r from-transparent 
                             via-white/10 to-transparent skew-x-12"
                  />
                )}
                <animated.img
                  src={currentProduct.images[0].publicUrl || "/placeholder.jpg"}
                  alt={currentProduct.productName}
                  style={imageAnimation}
                  onLoad={() => setIsImageLoaded(true)}
                  className="h-full w-full object-cover transform-gpu"
                />

                {/* Enhanced Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

                {/* New Ambient Light Effect */}
                <div className="absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
              </div>

              {/* Enhanced Drag Indicator */}
              <AnimatePresence>
                {isDragging && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-x-0 top-1/2 flex justify-center items-center pointer-events-none"
                  >
                    <div
                      className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 
                                 text-white text-sm font-medium shadow-xl"
                    >
                      <motion.div
                        animate={{ y: dragY > 0 ? -5 : 5 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        {dragY > 0
                          ? "⬆️ Release to previous"
                          : "⬇️ Release to next"}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Info Section */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 text-white z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* New Product Tag */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 
                             px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {currentProduct.category}
                  </motion.div>
                  <div className="flex items-center text-white/70 text-sm">
                    <Music2 className="w-4 h-4 mr-1" />
                    Featured Product
                  </div>
                </div>

                {/* Enhanced Product Title & Price */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/90 
                           bg-clip-text text-transparent"
                >
                  {currentProduct.productName}
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-baseline gap-2 mb-3"
                >
                  <span className="text-2xl font-bold text-purple-400">
                    Rs. {currentProduct.productPrice}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-sm text-white/50 line-through">
                      Rs. {currentProduct.originalPrice}
                    </span>
                  )}
                </motion.div>

                {/* Enhanced Description */}
                <div className="relative mb-4">
                  <animated.div
                    style={descriptionAnimation}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-white/80 leading-relaxed">
                      {currentProduct.productDescription}
                    </p>
                  </animated.div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="flex items-center gap-1 text-sm text-purple-300 mt-2 
                             hover:text-purple-200 transition-colors"
                  >
                    {isDescriptionExpanded ? "Show less" : "Show more"}
                    <ExpandIcon
                      className={`w-4 h-4 transition-transform duration-300 
                              ${isDescriptionExpanded ? "rotate-180" : ""}`}
                    />
                  </motion.button>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-4 mb-6">
                  <Link
                    href={`/store/${currentProduct.category}/${currentProduct.productId}`}
                    className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full 
                             font-medium flex-1 text-center transition-all duration-300
                             hover:bg-white/20 hover:shadow-lg active:scale-95"
                  >
                    View Details
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 
                             rounded-full font-medium flex-1 hover:shadow-lg
                             hover:from-purple-500 hover:to-blue-500 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300"
                  >
                    {isAddingToCart ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          ⭐
                        </motion.span>
                        Adding...
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced Side Actions */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    if (!isLiked) triggerSparkleEffect();
                  }}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500 shadow-lg shadow-red-500/50"
                      : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "fill-white" : ""
                    } text-white`}
                  />
                  {isLiked && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      className="absolute -top-2 -right-2 bg-red-500 text-xs 
                               rounded-full px-2 py-1 text-white"
                    >
                      +1
                    </motion.span>
                  )}
                </motion.button>

                {/* Other enhanced action buttons */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full 
                           hover:bg-white/20 transition-all duration-300"
                >
                  <Share2 className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full 
                           hover:bg-white/20 transition-all duration-300"
                >
                  <ShoppingCart className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Enhanced Navigation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    currentIndex > 0 && setCurrentIndex((prev) => prev - 1)
                  }
                  className={`p-2 rounded-full bg-white/10 backdrop-blur-md 
                           transition-all duration-300 ${
                             currentIndex === 0
                               ? "opacity-50 cursor-not-allowed"
                               : "hover:bg-white/20"
                           }`}
                >
                  <ChevronUp className="w-6 h-6 text-white" />
                </motion.button>

                <div
                  className="text-white text-center text-sm font-medium 
                             bg-white/10 backdrop-blur-md rounded-full px-3 py-1"
                >
                  {currentIndex + 1}/{products.length}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    currentIndex < products.length - 1 &&
                    setCurrentIndex((prev) => prev + 1)
                  }
                  className={`p-2 rounded-full bg-white/10 backdrop-blur-md 
                           transition-all duration-300 ${
                             currentIndex === products.length - 1
                               ? "opacity-50 cursor-not-allowed"
                               : "hover:bg-white/20"
                           }`}
                >
                  <ChevronDown className="w-6 h-6 text-white" />
                </motion.button>
              </motion.div>

              {/* Enhanced Toast */}
              <animated.div
                style={toastAnimation}
                className="fixed top-20 left-1/2 bg-white/90 text-black px-6 py-3 
                         rounded-full shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-purple-500" />
                Added to Cart! 🛍️
              </animated.div>

              {/* New Sparkle Effect */}
              <AnimatePresence>
                {showSparkle && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-t 
                                 from-purple-500/20 to-transparent mix-blend-overlay"
                    />
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          scale: 0,
                          x: Math.random() * window.innerWidth,
                          y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.random() * window.innerWidth,
                          y: Math.random() * window.innerHeight,
                        }}
                        transition={{
                          duration: 1,
                          delay: Math.random() * 0.5,
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </animated.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TikTokProductView;
