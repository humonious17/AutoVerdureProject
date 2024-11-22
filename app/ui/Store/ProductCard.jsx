"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductCard = ({ product, viewType = "grid" }) => {
  const plants = product.productType === "plants";
  const flowers = product.productType === "flowers";
  const planters = product.productType === "planters";
  const accessory = product.productType === "accessory";
  const [isHover, setHover] = useState(false);
  const productDetail = product;
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0].publicUrl
      : null;

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
          className={`relative
          ${
            isListView
              ? "w-full sm:w-[200px] aspect-square sm:aspect-auto sm:h-full flex-shrink-0"
              : "w-full aspect-square sm:aspect-auto sm:h-[316px]"
          }`}
        >
          {productImage ? (
            <Image
              className={`w-full h-full object-cover rounded-[24px] sm:rounded-[44px]
                ${isListView ? "sm:h-full" : ""}`}
              src={productImage}
              alt={product.productName}
              width={175}
              height={136.881}
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-full object-cover rounded-[24px] sm:rounded-[44px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No Image Available</p>
            </div>
          )}

          {/* Stock Status Badge */}
          <div className="w-fit text-[10px] sm:text-[13px] p-1 sm:px-[14px] sm:py-[13px] leading-4 tracking-[0.56px] rounded-[40px] absolute top-[10px] left-[10px] sm:top-[24px] sm:left-[30px] bg-white text-[#5B5B5B] uppercase flex justify-center items-center">
            <p>
              {productDetail.stockQuantity === 0
                ? "Sold Out"
                : productDetail.stockQuantity > 10
                ? "in stock"
                : "few left"}
            </p>
          </div>

          {/* Product Icons */}
          {(plants || flowers || planters || accessory) && (
            <div
            className={`w-fit flex flex-col gap-[6px] sm:gap-[12px] 
              absolute top-[10px] right-[10px] sm:top-[21.18px] sm:right-[29px]`}
            >
              {product.petFriendly && (
                <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] p-[4px] sm:p-[10px] rounded-xl sm:rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/veterinary.png"
                    alt="veterinary"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              )}
              {product.petUnfriendly && (
                <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] p-[4px] sm:p-[10px] rounded-xl sm:rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noPets.png"
                    alt="noPets"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              )}
              {product.lessLight && (
                <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] p-[4px] sm:p-[10px] rounded-xl sm:rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noLight.png"
                    alt="noLight"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              )}
              {product.moreLight && (
                <div className="w-[28px] h-[28px] sm:w-[52px] sm:h-[52px] p-[4px] sm:p-[10px] rounded-xl sm:rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/brightness.png"
                    alt="brightness"
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
              className={`w-full flex justify-between items-center px-2 sm:px-4
              ${isListView ? "sm:mt-auto" : ""}`}
            >
              <p className="text-xs sm:text-[17px] leading-5 text-[#0E0E0E] font-medium">
                ₹ {productDetail.productPrice}
              </p>
              <button className="px-3 py-1.5 sm:px-[33px] sm:py-[5px] text-xs sm:text-xl font-medium border border-[#9F9F9F] rounded-full hover:bg-gray-100 transition-colors">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
