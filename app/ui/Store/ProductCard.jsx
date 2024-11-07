"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const plants = product.productType === "plants";
  const grobox = product.productType === "grobox";
  const zenpot = product.productType === "zenpot";
  const accessory = product.productType === "accessory";
  const [isHover, setHover] = useState(false);
  const productDetail = product;
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0].publicUrl
      : null;

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  // Collect image URLs into an array
  const productImages = Object.values(productDetail.images || {}).filter(
    Boolean
  ); // This collects the image URLs

  return (
    <div
      className="w-full rounded-[44px] hover:shadow-primaryMain shadow-lg transition duration-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <div className="p-2">
        <div className="w-full xl:w-full h-full xl:h-[316px] relative">
          {productImage ? (
            <Image
              className="w-full h-full object-cover rounded-[44px]"
              src={productImage}
              alt={product.productName}
              width={175}
              height={136.881}
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-full object-cover rounded-[44px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
          <div className="w-fit text-[10px] md:text-[13px] p-1 md:px-[14px] md:py-[13px] leading-4 tracking-[0.56px] rounded-[40px] absolute top-[10px] left-[15px] md:top-[24px] md:left-[30px] bg-white text-[#5B5B5B] uppercase flex justify-center items-center">
            <p>
              {productDetail && productDetail.stockQuantity > 10
                ? "in stock"
                : "few left"}
            </p>
          </div>

          {plants && (
            <div className="hidden w-fit xl:flex flex-col gap-[12px] absolute top-[21.18px] right-[29px]">
              {product.petFriendly && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/veterinary.png"
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.petUnfriendly && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noPets.png"
                    alt="noPets"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.lessLight && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noLight.png"
                    alt="noLight"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.moreLight && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/brightness.png"
                    alt="brightness"
                    width={32}
                    height={32}
                  />
                </div>
              )}
            </div>
          )}
          {grobox && (
            <div className="hidden w-fit xl:flex flex-col gap-[12px] absolute top-[21.18px] right-[29px]">
              {product.petFriendly && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/veterinary.png"
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.petUnfriendly && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noPets.png"
                    alt="noPets"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.lessLight && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noLight.png"
                    alt="noLight"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.moreLight && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/brightness.png"
                    alt="brightness"
                    width={32}
                    height={32}
                  />
                </div>
              )}
            </div>
          )}
          {zenpot && (
            <div className="hidden w-fit xl:flex flex-col gap-[12px] absolute top-[21.18px] right-[29px]">
              {product.petFriendly && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/veterinary.png"
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.petUnfriendly && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noPets.png"
                    alt="noPets"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.lessLight && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/noLight.png"
                    alt="noLight"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {product.moreLight && (
                <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                  <Image
                    src="/brightness.png"
                    alt="brightness"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {accessory && (
                <div className="hidden w-fit xl:flex flex-col gap-[12px] absolute top-[21.18px] right-[29px]">
                  {product.petFriendly && (
                    <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                      <Image
                        src="/veterinary.png"
                        alt="veterinary"
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  {product.petUnfriendly && (
                    <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                      <Image
                        src="/noPets.png"
                        alt="noPets"
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  {product.lessLight && (
                    <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                      <Image
                        src="/noLight.png"
                        alt="noLight"
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  {product.moreLight && (
                    <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                      <Image
                        src="/brightness.png"
                        alt="brightness"
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Product description */}
        <div className="mt-[15px] md:mt-[39.19px] px-[11px] md:px-0">
          <div className="w-full flex flex-col gap-[8px] md:gap-[14px]">
            <p className="text-base md:text-[21px] leading-[25.2px] font-normal">
              {productDetail.productName}
            </p>
            <div
              className={`transition-height duration-400 ease-in-out overflow-hidden`}
              style={{
                width: "100%",
                height: "65px",
                animation: isHover
                  ? "increaseParaHeight 0.5s forwards"
                  : "decreaseParaHeight 0.5s forwards",
              }}
            >
              <p
                name={productDetail.productId}
                className="xl:pr-[26px] text-xs md:text-[17px] leading-[14px] md:leading-[30px] text-[#898989] font-normal transition-all duration-400 ease-in-out"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: isHover ? 7 : 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {productDetail.productDescription}
              </p>
            </div>
            <div
              className="w-full flex flex-col md:flex-row justify-between md:items-center"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
            >
              <p className="text-xs md:text-[17px] leading-5 text-[#0E0E0E] font-medium">
                ₹ {productDetail.productPrice}
              </p>
              <div className="mt-[11.92px] md:mt-0 w-[63px] text-[8.195px] md:text-xl py-[5px] md:px-[33px] font-medium border-[0.51px] rounded-[29.2px] border-[#9F9F9F] flex justify-center items-center">
                <p>Add</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
