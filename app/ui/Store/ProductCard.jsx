/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LoadingSkeleton = ({ viewType }) => {
  const isListView = viewType === "list";

  return (
    <div
      className={`w-full rounded-[24px] sm:rounded-[44px] shadow-lg
      ${isListView ? "sm:flex sm:gap-6 sm:h-[200px]" : ""}`}
    >
      <div className={`p-2 ${isListView ? "sm:flex sm:gap-6 sm:w-full" : ""}`}>
        {/* Image Skeleton with shimmer effect */}
        <div
          className={`relative overflow-hidden
          ${
            isListView
              ? "w-full sm:w-[200px] aspect-square sm:aspect-auto sm:h-full flex-shrink-0"
              : "w-full aspect-square sm:aspect-auto sm:h-[432px]"
          }`}
        >
          <div
            className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-[24px] sm:rounded-[44px] animate-[shimmer_2s_infinite]"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite linear",
            }}
          />

          {/* Stock Badge Skeleton */}
          <div className="w-20 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-[40px] absolute top-[10px] left-[10px] sm:top-[24px] sm:left-[30px] animate-[shimmer_2s_infinite]" />

          {/* Icon Skeletons */}
          <div className="w-fit flex flex-col gap-[6px] sm:gap-[12px] absolute top-[10px] right-[10px] sm:top-[21.18px] sm:right-[29px]">
            <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl sm:rounded-2xl animate-[shimmer_2s_infinite]" />
            <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl sm:rounded-2xl animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div
          className={`mt-3 sm:mt-[39.19px] px-2 sm:px-0 
          ${
            isListView
              ? "sm:mt-0 sm:flex-1 sm:flex sm:flex-col sm:justify-between"
              : ""
          }`}
        >
          <div className="w-full flex flex-col gap-2 sm:gap-[14px]">
            {/* Title Skeleton */}
            <div className="h-6 sm:h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-3/4 animate-[shimmer_2s_infinite]" />

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-full animate-[shimmer_2s_infinite]" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-5/6 animate-[shimmer_2s_infinite]" />
            </div>

            {/* Price and Button Skeleton */}
            <div
              className={`w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center 
              px-2 sm:px-4 gap-2 sm:gap-0 ${isListView ? "sm:mt-auto" : ""}`}
            >
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-24 animate-[shimmer_2s_infinite]" />
              <div className="w-full sm:w-32 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, viewType = "grid", isLoading = false }) => {
  const plants = product?.productType === "plants";
  const flowers = product?.productType === "flowers";
  const [isHover, setHover] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const productDetail = product;
  const images = product?.images || [];
  const hasMultipleImages = images.length > 1;

  if (isLoading) {
    return <LoadingSkeleton viewType={viewType} />;
  }

  const minSwipeDistance = 50;

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      previousImage();
    }
  }, [touchStart, touchEnd]);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const isListView = viewType === "list";

  return (
    <div
      className={`w-full rounded-[24px] sm:rounded-[44px] hover:shadow-primaryMain shadow-lg transition duration-100
        ${isListView ? "sm:flex sm:gap-6 sm:h-[200px]" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`p-2 ${isListView ? "sm:flex sm:gap-6 sm:w-full" : ""}`}>
        {/* Product Image Container */}
        <div
          className={`relative group
            ${
              isListView
                ? "w-full sm:w-[200px] aspect-square sm:aspect-auto sm:h-full flex-shrink-0"
                : "w-full aspect-square sm:aspect-auto sm:h-[432px]"
            }`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.length > 0 ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 rounded-[24px] sm:rounded-[44px] animate-pulse" />
              )}
              <Image
                className={`w-full h-full object-cover rounded-[24px] sm:rounded-[44px] transition-opacity duration-300
                  ${isListView ? "sm:h-full" : ""}
                  ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                src={images[currentImageIndex].publicUrl}
                alt={product.productName}
                width={175}
                height={136.881}
                onLoad={() => setImageLoaded(true)}
                unoptimized={true}
              />

              {/* Navigation Arrows */}
              {hasMultipleImages && imageLoaded && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {hasMultipleImages && imageLoaded && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        currentImageIndex === index
                          ? "bg-primaryMain w-3 px-[8px] transition-transform duration-200"
                          : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full object-cover rounded-[24px] sm:rounded-[44px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No Image Available</p>
            </div>
          )}

          {/* Stock Status Badge */}
          <div className="w-fit text-[10px] sm:text-[13px] p-1 sm:px-[14px] sm:py-[13px] leading-4 tracking-[0.56px] rounded-[40px] absolute top-[10px] left-[10px] sm:top-[24px] sm:left-[30px] bg-white/50 text-[#5B5B5B] uppercase flex justify-center items-center">
            <p>
              {productDetail.stockQuantity === 0
                ? "Sold Out"
                : productDetail.stockQuantity > 10
                ? "in stock"
                : "few left"}
            </p>
          </div>

          {/* Product Icons */}
          {(plants || flowers) && (
            <div className="w-fit flex flex-col gap-[6px] sm:gap-[12px] absolute top-[10px] right-[10px] sm:top-[21.18px] sm:right-[29px]">
              {product.petFriendly && (
                <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] p-[4px] sm:p-[10px] rounded-xl sm:rounded-2xl bg-[#FFFFFF]/50">
                  <Image
                    src={
                      product.petFriendly === "true"
                        ? "/veterinary.png"
                        : "/npf1.png"
                    }
                    alt="veterinary"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              )}
              {product.lessLight && (
                <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] p-[4px] sm:p-[10px] rounded-xl sm:rounded-2xl bg-[#FFFFFF]/50">
                  <Image
                    src={
                      product.lessLight === "true"
                        ? "/noLight.png"
                        : "/brightness.png"
                    }
                    alt={
                      product.lessLight === "true" ? "lessLight" : "moreLight"
                    }
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Description */}
        <div
          className={`mt-3 sm:mt-[39.19px] px-2 sm:px-0 
          ${
            isListView
              ? "sm:mt-0 sm:flex-1 sm:flex sm:flex-col sm:justify-between"
              : ""
          }`}
        >
          <div className="w-full flex flex-col gap-2 sm:gap-[14px]">
            <p
              className={`text-sm sm:text-[21px] leading-tight sm:leading-[25.2px] font-normal
              ${isListView ? "sm:text-2xl" : ""}`}
            >
              {productDetail.productName}
            </p>
            <div
              className={`transition-height duration-400 ease-in-out overflow-hidden
                ${isListView ? "sm:flex-1" : ""}`}
              style={{
                height: isListView ? "auto" : "48px",
                animation: !isListView
                  ? isHover
                    ? "increaseParaHeight 0.5s forwards"
                    : "decreaseParaHeight 0.5s forwards"
                  : "none",
              }}
            >
              <p
                className={`text-xs sm:text-[17px] leading-4 sm:leading-[30px] text-[#898989] font-normal
                  ${isListView ? "sm:line-clamp-3" : ""}`}
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: isListView ? 3 : isHover ? 7 : 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {productDetail.productSubtitle}
              </p>
            </div>

            <div
              className={`w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center px-2 sm:px-4 gap-2 sm:gap-0
              ${isListView ? "sm:mt-auto" : "justify-center items-center"}`}
            >
              <p className="text-xs sm:text-[17px] leading-5 text-[#0E0E0E] font-normal">
                From ₹ {productDetail.productPrice}
              </p>
              <button className="w-full sm:w-auto px-3 py-1.5 sm:px-[33px] sm:py-[5px] text-xs sm:text-xl font-medium border border-[#9F9F9F] rounded-full hover:bg-gray-100 transition-colors">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
