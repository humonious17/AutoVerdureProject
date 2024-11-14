/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-sync-scripts */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Testimonials from "../Testimonial";
import CartOverview from "../Cart/cartOverview";
import { setProducts } from "@/features/productsSlice/productSlice";
import { useRouter } from "next/router";
import Head from "next/head";
import Reviewfom from "@/pages/Reviewfom";
import { set } from "react-hook-form";

const SingleProductPage = ({ productData, allProducts }) => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    script1.type = "module";
    script1.async = true;
    document.head.appendChild(script1);

    // Cleanup function to remove the scripts when the component unmounts
    return () => {
      document.head.removeChild(script1);
    };
  }, []);

  const [size, setSize] = useState("");
  const [stockQuantity, setStockQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add To Cart");
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [style, setStyle] = useState("");
  const router = useRouter();
  const [imageId, setImageId] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const fallbackImageUrl =
    "https://kamayo.in/wp-content/themes/koji/assets/images/default-fallback-image.png";
  const [currentImageUrls, setCurrentImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [basePrice] = useState(productData.productPrice);
  const [price, setPrice] = useState(basePrice); // Initial price
  const [selectedColor, setSelectedColor] = useState(productData.defaultColor);
  const [dimensions, setDimensions] = useState(
    "Please Select a size to see it's dimensions"
  );
  const [innerDimensions, setInnerDimensions] = useState(
    "Please Select a size to see it's Inner dimensions"
  );
  const [outerHeight, setOuterHeight] = useState(
    "Please Select a size to see it's Outer Height"
  );
  const [outerDiameter, setOuterDiameter] = useState(
    "Please Select a size to see it's Out Diameter"
  );
  const [weight, setWeight] = useState(
    "Please Select a size to see it's Weight"
  );
  const [volume, setVolume] = useState(
    "Please Select a size to see it's Volume"
  );

  const colors = {
    White: {
      hex: "#FFFFFF",
      isAvailable: productData.white === "true",
      price: productData.colors.white?.price || 0,
    },
    Cream: {
      hex: "#FFFDD0",
      isAvailable: productData.cream === "true",
      price: productData.colors.cream?.price || 0,
    },
    LightGrey: {
      hex: "#D3D3D3",
      isAvailable: productData.lightGrey === "true",
      price: productData.colors.lightGrey?.price || 0,
    },
    DarkGrey: {
      hex: "#A9A9A9",
      isAvailable: productData.darkGrey === "true",
      price: productData.colors.darkGrey?.price || 0,
    },
    Black: {
      hex: "#000000",
      isAvailable: productData.black === "true",
      price: productData.colors.black?.price || 0,
    },
  };

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleDescription = () => setIsDescriptionOpen(!isDescriptionOpen);
  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize); // Update the selected size state

    // Check if the selected size exists in the sizes object
    const selectedSizeData = productData.sizes[selectedSize];

    if (selectedSizeData) {
      // Update price
      const selectedSizePrice = selectedSizeData.price || basePrice;
      const colorPrice = productData.colors[selectedColor]?.price || 0;
      setPrice(selectedSizePrice + colorPrice);

      // Update dimensions
      const { width = 0, height = 0, depth = 0 } = selectedSizeData;
      const { ih = 0, il = 0 } = selectedSizeData;
      const dimensionString = `${width}cm x ${height}cm x ${depth}cm`;
      const InnerDimensionString = `${ih}cm x ${il}cm`;
      const outerHeightString = `${selectedSizeData.outerHeight}cm`;
      const outerDiameterString = `${selectedSizeData.outerDiameter}cm`;
      const weightString = `${selectedSizeData.weight}g`;
      const volumeString = `${selectedSizeData.volume}L`;
      setOuterHeight(outerHeightString);
      setOuterDiameter(outerDiameterString);
      setWeight(weightString);
      setVolume(volumeString);
      setDimensions(dimensionString);
      setInnerDimensions(InnerDimensionString);
      //console.log("new dimensions: " + dimensionString);
    } else {
      // Reset to base values if size data doesn't exist
      setPrice(basePrice);
      setDimensions("");
    }
  };
  const incrementQuantity = () => {
    setStockQuantity(stockQuantity + 1);
  };

  const decrementQuantity = () => {
    if (stockQuantity > 1) {
      setStockQuantity(stockQuantity - 1);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color); // Update the selected color state

    // Check if the selected color exists in the colors object and has a price
    const selectedColorPrice = productData.colors[color]?.price || 0;

    // Calculate the new price based on the selected color and current size
    const sizePrice = productData.sizes[size]?.price || basePrice;
    setPrice(sizePrice + selectedColorPrice); // Update price
  };

  const handleColorSelection = (colorKey) => {
    setSelectedColor(colorKey);

    // Update price based on selected color and current size
    const selectedColorPrice = colors[colorKey].price;
    const sizePrice = productData.sizes[size]?.price || basePrice;
    setPrice(sizePrice + selectedColorPrice);
  };

  useEffect(() => {
    if (productData && productData.images) {
      // Assuming productData.images contains the full image objects with publicUrl
      const imageUrls = productData.images.map((image) => image.publicUrl);
      setCurrentImageUrls(imageUrls);
      setLoading(false);
    } else {
      setCurrentImageUrls([fallbackImageUrl]);
      setLoading(false);
    }
  }, [productData]);

  const handleNextImageClick = (clickSide) => {
    setImageId((prevId) => {
      if (clickSide === "right") {
        return (prevId + 1) % currentImageUrls.length; // Navigate to the right
      } else if (clickSide === "left") {
        return (prevId - 1 + currentImageUrls.length) % currentImageUrls.length; // Navigate to the left
      }
      return prevId; // No change
    });
  };

  const MainImageSection = () => (
    <div className="w-full sm:flex sm:flex-col sm:w-[50%] xl:w-[624px]">
      <div className="h-[550px] w-full relative">
        {!loading && (
          <>
            <Image
              className="object-cover w-full h-full rounded-[44px]"
              src={currentImageUrls[imageId] || fallbackImageUrl} // Main image based on imageId
              alt={productData.productName}
              width={550}
              height={550}
              unoptimized={true}
            />
            {currentImageUrls.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-[29px] transform -translate-y-1/2 cursor-pointer"
                  onClick={() => handleNextImageClick("left")} // Left arrow click
                >
                  <Image
                    src="/leftArrow1Purple.svg"
                    height={32}
                    width={25}
                    alt="Previous"
                  />
                </button>
                <button
                  className="absolute top-1/2 right-[29px] transform -translate-y-1/2 cursor-pointer"
                  onClick={() => handleNextImageClick("right")} // Right arrow click
                >
                  <Image
                    src="/rightArrow1Purple.svg"
                    height={32}
                    width={25}
                    alt="Next"
                  />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {currentImageUrls.length > 1 && (
        <div className="mt-[20px] w-full grid grid-cols-4 xl:grid-cols-2 gap-x-[6px] xl:gap-x-4 xl:gap-y-[24px] justify-center items-center">
          {!loading &&
            currentImageUrls.map((url, index) => (
              <div
                key={index}
                className="w-full h-[76px] xl:h-[264px] cursor-pointer"
                onClick={() => setImageId(index)} // Update main image to the clicked thumbnail
              >
                <Image
                  className={`object-cover w-full h-full rounded-[22px] ${
                    imageId === index ? "border-2 border-primaryMain" : ""
                  }`}
                  src={url || fallbackImageUrl} // Always use the URL from the original array
                  alt={`${productData.productName}-${index + 1}`}
                  width={86}
                  height={76}
                  unoptimized={true}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );

  const show3dModel = () => {
    setShowModel(true);
  };

  const hideModelViewer = () => {
    setShowModel(false);
  };

  const handleAddToCart = async () => {
    if (!selectedColor || !size) {
      setError("Please select color and size.");
      return;
    }
    setError("");
    setButtonText("Adding...");

    const payload = {
      productId: productData.productId,
      productName: productData.productName, // Added productName
      productPrice: price, // Added current price (which includes size/color adjustments)
      productColor: selectedColor,
      productSize: size,
      productQuantity: stockQuantity,
      productStyle: style,
    };

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setButtonText("Added");
        const result = await response.json();
        const cartProducts = result.cartProducts;
        setCartItems(cartProducts);
        setIsCartVisible(true);
      } else {
        setButtonText("Add To Cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setButtonText("Add To Cart");
    }
  };

  const handleBuyNow = () => {
    if (!selectedColor || !size) {
      setError("Please select color and size.");
      return;
    }
    setError("");

    const payload = {
      productId: productData.productId,
      productName: productData.productName,
      productPrice: price,
      productColor: selectedColor,
      productSize: size,
      productQuantity: stockQuantity,
      productStyle: style,
    };

    const isPaymentValid = validatePaymentDetails();
    if (!isPaymentValid) {
      setError(
        "Payment details are invalid. Please check your payment information."
      );
      return;
    }

    router.push({
      pathname: "/checkout/guest",
      query: { ...payload },
    });
  };

  // Example of a payment validation function
  const validatePaymentDetails = () => {
    // Add your payment validation logic here
    // For example, check if payment details are filled and valid
    return true; // Return true if valid, false otherwise
  };

  // State to control whether to show all products or just three
  const [showAll, setShowAll] = useState(false);

  // Function to handle the "Browse all" click
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Products to display based on showAll state
  const displayedProducts = showAll ? allProducts : allProducts.slice(0, 3);

  return (
    <div className="w-full px-[18px] sm:px-[38px] xl:px-16 bg-[#FFFCF8]">
      <Head>
        <script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        ></script>
      </Head>
      <div className="pt-[13px] sm:pt-[29px] xl:pt-[96.5px] pb-[221px] flex flex-col justify-center items-center">
        {/* Navigation */}
        <div className="w-full text-[17px] leading-[30px] text-[#5B5B5B] font-normal flex justify-center items-center sm:justify-normal sm:items-start">
          <p className="flex gap-[19px]">
            <Link href="/">
              <span>Home</span>
            </Link>{" "}
            /{" "}
            <Link href="/store">
              <span>Store</span>
            </Link>{" "}
            /{" "}
            <Link href="/store/planters">
              <span className="text-[#000]">{productData.productName}</span>
            </Link>
          </p>
        </div>

        {isCartVisible && (
          <CartOverview
            items={cartItems}
            onClose={() => setIsCartVisible(false)}
          />
        )}

        {/* Product Details */}
        <div className="mt-[27.79px] sm:mt-[17.3px] xl:mt-[51.5px] xl:max-w-[1312px] w-full flex flex-col sm:flex-row sm:gap-x-[30.5px] xl:gap-x-16 justify-center items-center sm:items-start">
          {/* Product Image */}
          <div className="w-full sm:flex sm:flex-col sm:w-[50%] xl:w-[624px]">
            <div className="h-[550px] w-full relative">
              <Image
                className="object-cover w-full h-full rounded-[44px]"
                src={currentImageUrls[imageId] || fallbackImageUrl}
                alt={productData.productName}
                width={550}
                height={550}
                unoptimized={true}
              />

              <div
                style={{
                  height: "32px",
                  width: "32px",
                  position: "absolute",
                  top: "50%",
                  left: "29px",
                  cursor: "pointer",
                }}
              >
                <Image
                  src="/leftArrow1Purple.svg"
                  height={32}
                  width={25}
                  onClick={() => {
                    handleNextImageClick("left");
                  }}
                />
              </div>
              <div
                style={{
                  height: "32px",
                  width: "32px",
                  position: "absolute",
                  top: "50%",
                  right: "29px",
                  cursor: "pointer",
                }}
              >
                <Image
                  src="/rightArrow1Purple.svg"
                  height={32}
                  width={25}
                  onClick={() => {
                    handleNextImageClick("right");
                  }}
                />
              </div>

              <div className="flex w-fit xl:flex flex-col gap-[12px] absolute top-[21.18px] right-[29px]">
                {productData.petFriendly === "true" ? (
                  <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                    <Image
                      src="/veterinary.png"
                      alt="veterinary"
                      width={32}
                      height={32}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {productData.petUnfriendly === "true" ? (
                  <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                    <Image
                      src="/noPets.png"
                      alt="veterinary"
                      width={32}
                      height={32}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {productData.lessLight === "true" ? (
                  <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                    <Image
                      src="/noLight.png"
                      alt="noLight"
                      width={32}
                      height={32}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {productData.moreLight === "true" ? (
                  <div className="w-[52px] h-[52px] p-[10px] rounded-2xl bg-[#FFFFFF]">
                    <Image
                      src="/brightness.png"
                      alt="brightness"
                      width={32}
                      height={32}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <button
                className="px-[12.15px] py-[5.79px] xl:px-[21px] xl:py-[10px] text-[8.099px] xl:text-sm border-[0.58px] rounded-[18.5px] absolute bottom-[19.22px] right-[18.17px] xl:bottom-[29.5px] xl:right-[31px] text-[#000] font-normal border-[#000]"
                onClick={show3dModel}
              >
                <p>View in 3D</p>
              </button>
              {showModel ? (
                <model-viewer
                  alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
                  src="https://res.cloudinary.com/dgzqokaju/image/upload/v1721140844/op3_mnxc5v.glb"
                  ar
                  environment-image="shared-assets/environments/moon_1k.hdr"
                  poster="shared-assets/models/NeilArmstrong.webp"
                  shadow-intensity="1"
                  camera-controls
                  touch-action="pan-y"
                ></model-viewer>
              ) : (
                <></>
              )}
            </div>

            <div className="mt-[20px] w-full grid grid-cols-4 xl:grid-cols-2 gap-x-[6px] xl:gap-x-4 xl:gap-y-[24px] justify-center items-center">
              <div className="w-full h-[76px] xl:h-[264px]">
                <Image
                  className="object-cover w-full h-full rounded-[22px]"
                  src={
                    currentImageUrls[(imageId + 1) % currentImageUrls.length] ||
                    fallbackImageUrl
                  }
                  alt="flowers.png"
                  width={86}
                  height={76}
                  unoptimized={true}
                />
              </div>
              <div className="w-full h-[76px] xl:h-[264px]">
                <Image
                  className="object-cover w-full h-full rounded-[22px]"
                  src={
                    currentImageUrls[(imageId + 2) % currentImageUrls.length] ||
                    fallbackImageUrl
                  }
                  alt="flowers.png"
                  width={86}
                  height={76}
                  unoptimized={true}
                />
              </div>
              <div className="w-full h-[76px] xl:h-[264px]">
                <Image
                  className="object-cover w-full h-full rounded-[22px]"
                  src={
                    currentImageUrls[(imageId + 3) % currentImageUrls.length] ||
                    fallbackImageUrl
                  }
                  alt="flowers.png"
                  width={86}
                  height={76}
                  unoptimized={true}
                />
              </div>
              <div className="w-full h-[76px] xl:h-[264px]">
                <Image
                  className="object-cover w-full h-full rounded-[22px]"
                  src={
                    currentImageUrls[(imageId + 4) % currentImageUrls.length] ||
                    fallbackImageUrl
                  }
                  alt="flowers.png"
                  width={86}
                  height={76}
                  unoptimized={true}
                />
              </div>
            </div>
          </div>

          {showModel ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative w-4/5 h-4/5">
                <model-viewer
                  src="https://res.cloudinary.com/dgzqokaju/image/upload/v1721140844/op3_mnxc5v.glb"
                  alt="3d Model"
                  auto-rotate
                  camera-controls
                  ar
                  shadow-intensity="1"
                  touch-action="pan-y"
                  style={{ width: "100%", height: "100%" }}
                ></model-viewer>
                <button
                  onClick={hideModelViewer}
                  className="absolute top-0 right-0 m-4 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* Product Description */}
          <div className="mt-[31px] sm:flex sm:flex-col sm:w-[50%] xl:w-[624px] sm:mt-0 w-full">
            {/* Product Title */}
            <div>
              <p className="text-stone-950 text-[51px] font-normal font-['Inter'] leading-[64px] ">
                {productData.productName}
              </p>
            </div>

            {/* Product short description */}
            <div>
              <p className="mb-[21.5px] text-zinc-600 text-[17px] font-normal font-['Inter'] leading-[30px]">
                {productData.productTitle}
              </p>
            </div>

            {/* Product Price */}
            <div>
              <p className="text-stone-950 text-[27px] font-medium font-['Inter'] leading-10">
                ₹ {price} INR
              </p>
            </div>

            {/* Product Size, Color, Finish */}
            <div className="mt-[22px] w-full flex flex-col gap-8 sm:gap-6">
              {/* Product Size */}
              <div>
                <p className="text-sm font-normal">Size</p>
                <div className="mt-[12px] w-[200px] flex gap-4">
                  {["XS", "S", "M", "L", "XL"].map((sizeOption) =>
                    productData[sizeOption] === "true" ? (
                      <button
                        key={sizeOption}
                        onClick={() => handleSizeChange(sizeOption)} // Call handleSizeChange on click
                        className={`w-[80px] h-[30px] text-[13px] rounded-[5px] cursor-pointer flex justify-center items-center transition-transform duration-300 ease-in-out ${
                          size === sizeOption
                            ? "bg-[#9A5CF5] text-[#fff] shadow-lg transform scale-105"
                            : "bg-[#9A5CF5] bg-opacity-20 hover:bg-opacity-100 text-[#000000] hover:text-[#fff] hover:shadow-md"
                        }`}
                      >
                        <p className="uppercase font-semibold">
                          {sizeOption.toLowerCase()}
                        </p>
                      </button>
                    ) : null
                  )}
                </div>
              </div>

              {/* Product Color */}
              <p className="text-sm font-normal">Color</p>
              <div className="mt-[12px] w-[306px] flex gap-4">
                {Object.entries(colors).map(
                  ([colorKey, { hex, isAvailable }]) =>
                    isAvailable && (
                      <div
                        key={colorKey}
                        onClick={() => handleColorSelection(colorKey)}
                        style={{ backgroundColor: hex }}
                        className={`w-[30px] h-[30px] rounded-full cursor-pointer border-2 transition-transform duration-300 ease-in-out 
          ${
            selectedColor === colorKey
              ? "border-[#9A5CF5] shadow-lg scale-110 ring- ring-offset-2 ring-[#9A5CF5]"
              : "hover:shadow-md hover:scale-105"
          }`}
                      ></div>
                    )
                )}
              </div>

              {/* Product Finish */}
              <div className="mt-[22px] w-full flex flex-col gap-8 sm:gap-6">
                <div>
                  <p className="text-sm font-semibold mb-2">Finish</p>
                  <div className="mt-[12px] w-[200px] flex gap-4">
                    {["Matt", "Gloss", "Art"].map((finishOption) =>
                      productData[finishOption.toLowerCase()] === "true" ? (
                        <button
                          key={finishOption}
                          onClick={() => setStyle(finishOption)} // Call setStyle on click
                          className={`px-4 py-2 rounded-full cursor-pointer flex justify-center items-center transition-transform duration-300 ease-in-out ${
                            style === finishOption
                              ? "bg-[#9A5CF5] text-[#fff] shadow-lg transform scale-105"
                              : "bg-[#9A5CF5] bg-opacity-20 hover:bg-opacity-100 text-gray hover:text-[#fff] hover:shadow-md"
                          }`}
                        >
                          <p className="font-semibold">{finishOption}</p>
                        </button>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Discount Card */}
            <div className="mt-[37.5px] sm:mt-6 w-full flex flex-col gap-6 p-2 xl:p-5 rounded-xl border-[1px] bg-primaryMain bg-opacity-10 border-primaryMain">
              <div className="w-full flex justify-between items-center">
                <div className="w-full flex gap-2 items-center">
                  <Image
                    className="object-contain"
                    src="/badgeDiscount.svg"
                    alt="badgeDiscount"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm xl:text-[18px] leading-7 font-medium text-[#0C0C0C]">
                    Earn {Math.floor(price / 100)} Points with this purchase{" "}
                    {/* AV Points */}
                  </p>
                </div>
                <Image
                  className="object-contain"
                  src="/info.svg"
                  alt="badgeDiscount"
                  width={32}
                  height={32}
                />
              </div>

              {/* Login/Signup Information */}
              <div className="text-xs font-medium leading-6 underline text-[#0000EE]">
                <p>(Login/Signup)</p>
              </div>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}
            {/* Quantity, Add to cart, Buy now */}
            <div className="mt-[18.5px] sm:mt-6 w-full h-[32.8px] xl:h-16 flex gap-[18px] xl:justify-between">
              <div className="w-[63.077px] xl:w-[123px] h-full py-5 rounded-[29.2px] border-[0.51px] bg-[#FFFFFF] border-[#9F9F9F] flex justify-center items-center">
                <button className="px-2 py-1" onClick={decrementQuantity}>
                  -
                </button>
                <span className="px-2">{stockQuantity}</span>
                <button className="px-2 py-1" onClick={incrementQuantity}>
                  +
                </button>
              </div>
              <button
                className="w-[85.1px] xl:w-[166px] h-full text-[10.256px] xl:text-xl py-5 rounded-[29.7px] border-[0.51px] text-[#000000] bg-[#FFFFFF] border-[#000000] flex justify-center items-center"
                onClick={handleAddToCart}
              >
                {buttonText}
              </button>
              <button
                className="w-[154.359px] xl:w-[301px] h-full text-[10.256px] xl:text-xl py-5 leading-[12.308px] rounded-[35.9px] font-medium bg-primaryMain text-[#FFFFFF] flex justify-center items-center"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
            {productData.productType === "plants" && (
              <div className="mt-[21.5px] w-full sm:w-fit xl:w-full flex flex-row sm:flex-col xl:flex-row sm:gap-y-3 xl:gap-x-[22px] justify-between xl:justify-start">
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.petFriendly === "true"
                        ? "/veterinary.png"
                        : "/noPets.png"
                    }
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.petFriendly === "true"
                      ? "Pet Friendly"
                      : "Not pet Friendly"}
                    ;
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.lessLight === "true"
                        ? "/noLight.png"
                        : "/brightness.png"
                    }
                    alt={
                      productData.lessLight === "true"
                        ? "lessLight"
                        : "moreLight"
                    }
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.lessLight === "true"
                      ? "Needs Less Light"
                      : "Needs More Light"}
                  </p>
                </div>
              </div>
            )}
            {productData.productType === "flowers" && (
              <div className="mt-[21.5px] w-full sm:w-fit xl:w-full flex flex-row sm:flex-col xl:flex-row sm:gap-y-3 xl:gap-x-[22px] justify-between xl:justify-start">
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.petFriendly === "true"
                        ? "/veterinary.png"
                        : "/noPets.png"
                    }
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.petFriendly === "true"
                      ? "Pet Friendly"
                      : "Not pet Friendly"}
                    ;
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.lessLight === "true"
                        ? "/noLight.png"
                        : "/brightness.png"
                    }
                    alt={
                      productData.lessLight === "true"
                        ? "lessLight"
                        : "moreLight"
                    }
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.lessLight === "true"
                      ? "Needs Less Light"
                      : "Needs More Light"}
                  </p>
                </div>
              </div>
            )}
            {productData.productType === "planters" && (
              <div className="mt-[21.5px] w-full sm:w-fit xl:w-full flex flex-row sm:flex-col xl:flex-row sm:gap-y-3 xl:gap-x-[22px] justify-between xl:justify-start">
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.petFriendly === "true"
                        ? "/veterinary.png"
                        : "/noPets.png"
                    }
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.petFriendly === "true"
                      ? "Pet Friendly"
                      : "Not pet Friendly"}
                    ;
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.lessLight === "true"
                        ? "/noLight.png"
                        : "/brightness.png"
                    }
                    alt={
                      productData.lessLight === "true"
                        ? "lessLight"
                        : "moreLight"
                    }
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.lessLight === "true"
                      ? "Needs Less Light"
                      : "Needs More Light"}
                  </p>
                </div>
              </div>
            )}
            {productData.productType === "accessory" && (
              <div className="mt-[21.5px] w-full sm:w-fit xl:w-full flex flex-row sm:flex-col xl:flex-row sm:gap-y-3 xl:gap-x-[22px] justify-between xl:justify-start">
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.petFriendly === "true"
                        ? "/veterinary.png"
                        : "/noPets.png"
                    }
                    alt="veterinary"
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.petFriendly === "true"
                      ? "Pet Friendly"
                      : "Not pet Friendly"}
                    ;
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start xl:justify-between items-center">
                  <Image
                    src={
                      productData.lessLight === "true"
                        ? "/noLight.png"
                        : "/brightness.png"
                    }
                    alt={
                      productData.lessLight === "true"
                        ? "lessLight"
                        : "moreLight"
                    }
                    width={32}
                    height={32}
                  />
                  <p className="text-[13px] leading-[15.6px] -tracking-[0.325px] font-normal text-[#000000]">
                    {productData.lessLight === "true"
                      ? "Needs Less Light"
                      : "Needs More Light"}
                  </p>
                </div>
              </div>
            )}
            {/* Product long description, Payment methods */}
            <div className="mt-[30px] sm:mt-[39px] w-full sm:pr-[0px] hidden xl:flex xl:flex-col">
              {/* Product long description */}
              <div className="w-full text-sm sm:text-[17px] leading-[30px] flex flex-col gap-[18px]">
                {/* Description Dropdown */}
                <div className="w-full">
                  <button
                    className="w-full p-2 xl:p-5 text-left bg-primaryMain bg-opacity-10 rounded-xl border-[1px] border-primaryMain text-black flex justify-between items-center transition-colors duration-300 hover:bg-purple-200"
                    onClick={toggleDescription}
                  >
                    Product Description
                    <svg
                      className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${
                        isDescriptionOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDescriptionOpen && (
                    <div className="pl-4 mt-1 bg-white text-black p-3 rounded-md transition-opacity duration-300 opacity-100">
                      <p>{productData.productDescription}</p>
                    </div>
                  )}
                </div>

                {/* Product Details Dropdown */}
                <div className="w-full">
                  <button
                    className="w-full p-2 xl:p-5 text-left bg-primaryMain bg-opacity-10 rounded-xl border-[1px] border-primaryMain text-black flex justify-between items-center transition-colors duration-300 hover:bg-purple-200"
                    onClick={toggleDetails}
                  >
                    Product Details
                    <svg
                      className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${
                        isDetailsOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDetailsOpen && (
                    <ul className="pl-4 mt-1 bg-white text-black p-3 rounded-md transition-opacity duration-300 opacity-100">
                      <li className="decoration-dotted flex justify-start items-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                        Inner Dimensions - {innerDimensions}
                      </li>
                      <li className="decoration-dotted flex justify-start items-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                        Dimensions - {dimensions}
                      </li>
                      <li className="decoration-dotted flex justify-start items-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                        Outer Height - {outerHeight}
                      </li>
                      <li className="decoration-dotted flex justify-start items-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                        Outer Diameter - {outerDiameter}
                      </li>
                      <li className="decoration-dotted flex justify-start items-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                        Weight - {weight}
                      </li>
                      <li className="decoration-dotted flex justify-start items-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                        Volume - {volume}
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-[16.5px] w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-[17px] leading-[30px] text-[#000000] font-normal">
                  Accepted payment methods
                </p>

                <div className="mt-[19.32px] sm:mt-0 max-w-[269px] w-full flex gap-[14px]">
                  <div className="w-[80px] h-[46px]">
                    <Image
                      className="w-full h-full object-contain"
                      src="/paypal.svg"
                      alt="paypal"
                      width={80}
                      height={46}
                    />
                  </div>
                  <div className="w-[80px] h-[46px]">
                    <Image
                      className="w-full h-full object-contain"
                      src="/stripe.svg"
                      alt="stripe"
                      width={80}
                      height={46}
                    />
                  </div>
                  <div className="w-[80px] h-[46px]">
                    <Image
                      className="w-full h-full object-contain"
                      src="/mastercard.svg"
                      alt="mastercard"
                      width={80}
                      height={46}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Horizontal line */}
        <div className="mt-[42.68px] sm:mt-[61.18px] w-screen h-[1px] bg-[#F0F0F0]" />

        {/* Product long description, Payment methods */}
        <div className="mt-[30px] sm:mt-[39px] w-full sm:pr-[0px] xl:hidden">
          {/* Product long description */}
          <div className="w-full text-sm sm:text-[17px] leading-[30px] flex flex-col gap-[18px]">
            <p>
              planters nurtures your plant while adding a touch of serenity to
              your living space elevate your gardening journey and find your
              gardening journey and find your inner peace with the planters self
              watering system.
            </p>
            <ul className="w-full flex flex-col justify-start items-start">
              <li className="decoration-dotted flex justify-center items-center">
                <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                {productData.innerHeight} cm - Inner height,{" "}
                {productData.innerLength} cm Inner length/diameter
              </li>
              <li className="decoration-dotted flex justify-center items-center">
                <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                Water-resistant canvas
              </li>
              <li className="decoration-dotted flex justify-center items-center">
                <div className="w-[5px] h-[5px] rounded-full bg-[#5B5B5B] mr-[13.9px]" />
                Dimensions - {productData.dimensions}
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="mt-[16.5px] w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <p className="text-[17px] leading-[30px] text-[#000000] font-normal">
              Accepted payment methods
            </p>

            <div className="mt-[19.32px] sm:mt-0 max-w-[269px] w-full flex gap-[14px]">
              <div className="w-[80px] h-[46px]">
                <Image
                  className="w-full h-full object-contain"
                  src="/paypal.svg"
                  alt="paypal"
                  width={80}
                  height={46}
                />
              </div>
              <div className="w-[80px] h-[46px]">
                <Image
                  className="w-full h-full object-contain"
                  src="/stripe.svg"
                  alt="stripe"
                  width={80}
                  height={46}
                />
              </div>
              <div className="w-[80px] h-[46px]">
                <Image
                  className="w-full h-full object-contain"
                  src="/mastercard.svg"
                  alt="mastercard"
                  width={80}
                  height={46}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Product */}
        <div className="mt-[55.18px] sm:mt-[25px] lg:mt-[84.43px] xl:max-w-[1312px] w-full">
          <div className="hidden w-full sm:flex sm:justify-between sm:items-center">
            <p className="text-[38px] leading-[49.4px]">Add flowers</p>
            <p
              className="text-[21px] leading-[25.2px] font-normal pb-[7.99px] border-b-[2px] border-[#BBBBBB] cursor-pointer"
              onClick={toggleShowAll}
            >
              {showAll ? "Show less" : "Browse all"}
            </p>
          </div>

          <div className="sm:mt-[52.6px] w-full grid grid-cols-2 xl:grid-cols-3 gap-x-[9px] gap-y-[41.46px] md:gap-x-[43.21px] md:gap-y-16 xl:gap-x-[49px] xl:gap-y-[48px]">
            {displayedProducts.map((product, index) => (
              <Link
                className="w-full"
                key={index}
                href={`/store/${product.productName}/${product.productId}`}
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-[92.46px] sm:mt-[115px] xl:mt-[272.19px] xl:max-w-[1312px] w-full flex flex-col justify-center items-center">
          <p className="text-xl sm:text-[38px] leading-[49.4px] font-normal text-center text-[#0E0E0E]">
            What customers are saying
          </p>

          {/* Testimonial cards */}
          <div className="mt-10 sm:mt-[80.99px] xl:mt-[59.99px] w-full h-full">
            <Testimonials productId={productData.productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
