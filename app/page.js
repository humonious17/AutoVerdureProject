/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { collections, hydroponics } from "./constant/data";
import HydroponicCard from "./ui/Home/HydroponicCard";
import CollectionCard from "./ui/Home/CollectionCard";
import Testimonial from "./ui/Home/Testimonial";
import Displayblogs from "./ui/Store/Displayblogs";
import Contact from "./ui/Home/Contact";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Chatbot from "./ChatBot";
import { useSwipeable } from "react-swipeable";
import Script from "next/script";
import Power from "./ui/Home/Power";
import "./globals.css";
import ProductShowcase from "./ui/Home/ProductShowcase";
import HydroponicComparison from "./ui/Home/hydrotoggle";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/testimonial1.png",
    "https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/a8aee9c8-74cc-4552-9aaf-912df1033c2f/_7b31e3af-fc7a-48a0-a7ab-fd7d3f7d252c.jpg",
    "https://i.pinimg.com/736x/cb/b8/59/cbb859fac53e70d017e42d4b54e06861.jpg",
  ];

  const [currentIndex1, setCurrentIndex1] = useState(0);

  const handlePrev1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle swiping using react-swipeable
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext1(),
    onSwipedRight: () => handlePrev1(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional, allows mouse swiping for testing on desktop
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hydroponics.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [hydroponics]); // Use hydroponics directly as a dependency

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Touch event handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diffX = touchStartX.current - touchEndX.current;

      // Swipe threshold
      if (Math.abs(diffX) > 50) {
        // Swipe left
        if (diffX > 0 && currentIndex < hydroponics.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
        // Swipe right
        else if (diffX < 0 && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }

      // Reset touch coordinates
      touchStartX.current = null;
      touchEndX.current = null;
    }
  };

  // Optional: Auto-slide feature
  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev < hydroponics.length - 1 ? prev + 1 : 0));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoSlideTimer);
  }, [hydroponics.length]);

  return (
    <div className="w-full px-0 pr-0 md:px-10 pb-[100px] bg-[#FFFBF7] flex flex-col justify-center items-center overflow-hidden">
      {/* Hero */}
      <div className="relative w-screen flex flex-col-reverse md:flex-row xl:flex-col justify-center items-center overflow-hidden hero-container ">
        <div className="max-w-[361px] md:max-w-[500px] xl:max-w-[622px] mt-[157px] mx-auto xl:mt-[170px] z-10 content-container">
          {/* Title */}
          <p
            className="w-full mt-5 mx-0 text-[50px] md:text-[50px] xl:text-[64px] leading-[50px] md:leading-[60px] xl:leading-[76.8px] tracking-tight font-normal text-black hero-title text-left lg:text-center xl:text-center "
            style={{
              fontFamily: "Urbanist",
              fontWeight: 400,
              fontSize: "50px",
              lineHeight: "60px",
              letterSpacing: "-2.5%",
            }}
          >
            Exquisite & Sustainable <br /> Self-Watering Planters
          </p>

          {/* Description */}
          <p
            className="w-full mt-3 pl-0.5 mb-4 xl:mt-[20px] text-sm md:text-base xl:text-lg leading-6 text-left lg:text-center xl:text-center font-normal text-black hero-description "
            style={{
              color: "#3D3D3D",
              fontFamily: "Urbanist",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "24px",
            }}
          >
            Relax & experience rich greenery year-round with Auto Verdure's live
            indoor & outdoor hydroponic kits. Let our planters nurture your
            plants, save your time, & enhance your lifestyle to make urban
            farming simple & joyous.
          </p>

          {/* Buttons */}
          <div className="relative z-10 hidden md:flex mt-3 md:mt-8 w-full text-base font-medium gap-[28px] justify-center items-center hero-buttons ">
            <Link href="/store" passHref>
              <button
                className="shop-now w-[156px] h-[55px] rounded-[100px] text-white bg-primaryMain text-[16px] md:text-base"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                Shop now
              </button>
            </Link>
            <Link href="/about-us" passHref>
              <button
                className="learn-more w-[156px] h-[55px] text-primaryGrayscale border-[1px] border-primaryGrayscale rounded-[100px] bg-transparent text-[16px] md:text-base"
                style={{
                  borderRadius: "100px",
                  border: "1px solid var(--Greyscale-Black, #3D3D3D)",
                  whiteSpace: "nowrap",
                }}
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-center items-center mt-3 md:mt-8 w-full text-base font-medium px-0 ">
        <div className="w-[361px] flex justify-between ">
          <Link href="/store" passHref>
            <button
              className="shop-now w-[156px] h-[55px] flex justify-center items-center rounded-[100px] text-white bg-primaryMain text-[16px]"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              Shop now
            </button>
          </Link>
          <Link href="/about-us" passHref>
            <button
              className="learn-more w-[156px] h-[55px] flex justify-center items-center text-primaryGrayscale border-[1px] border-primaryGrayscale rounded-[100px] bg-transparent text-[16px]"
              style={{
                borderRadius: "100px",
                border: "1px solid var(--Greyscale-Black, #3D3D3D)",
                whiteSpace: "nowrap",
              }}
            >
              Learn More
            </button>
          </Link>
        </div>
      </div>
      {/* Image */}
      <div className="absolute top-[40px] right-[60px] md:right-[50px] image-container z-10">
        <Image
          className="xl:hidden pot-image transform-gpu scale-[2.2] origin-center"
          src="/nmb1.png"
          alt="bgImage"
          width={350}
          height={587}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      <div className="hidden md:block w-full h-[766px] absolute top-0 right-[20px] bg-transparent">
        <div className="h-full w-full relative overflow-hidden">
          <Image
            className="w-full h-full hidden xl:flex top-0 object-cover"
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translateX(12px)",
            }}
            src="/mainbgtrans2.png"
            alt="bgImage"
            width={1550}
            height={766}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div
            className="h-[90px] w-[10px] absolute"
            style={{
              height: "560px",
              width: "10px",
              marginLeft: "21.5%", // Decreased from 23.5%
              background: "#FFFBF7",
              top: "0px",
              animation: "shrinkHeight 2s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="h-[90px] w-[20px] absolute"
            style={{
              height: "0px",
              width: "4px",
              marginLeft: "78%", // Decreased from 80%
              background: "#FFFBF7",
              top: "0px",
              animation: "shrinkHeightRight 2s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="absolute"
            style={{
              background: "#FFFBF7",
              top: "395px",
              height: "5px",
              width: "57px",
              marginLeft: "21.4%", // Decreased from 23.4%
              animation: "shrinkWidthLeft 1.5s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="absolute"
            style={{
              background: "#FFFBF7",
              top: "394px",
              height: "5px",
              width: "57px",
              marginLeft: "80.9%", // Decreased from 82.9%
              animation: "shrinkWidthRight 1.5s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
        </div>
      </div>
      {/* Shop The New Collection */}
      <div
        className="mt-[78px] md:mt-[114px] xl:mt-[120px] max-w-[361px] md:max-w-[754px] xl:max-w-[1200px] w-full flex flex-col md:justify-center md:items-center relative z-20"
        style={{ marginTop: "15%", fontFamily: "SF Pro Display" }}
      >
        <p className="text-[20.049px] md:text-4xl xl:text-[50px] leading-[24.059px] md:leading-[43.2px] xl:leading-[60px] -tracking-[0.501px] md:-tracking-[0.9px] xl:-tracking-[1.25px] text-primaryGrayscale font-normal capitalize">
          Shop The New Collection
        </p>

        {/*<div className="mt-[33px] pt-[10px] pb-[10px] w-full grid grid-cols-2 place-items-stretch justify-center items-stretch gap-x-[12px] gap-y-[17.17px] md:gap-x-[17.17px] md:gap-y-[19.46px] xl:gap-x-[30px] xl:gap-y-[34px] sm:px-0 bg-[#FFFBF7]">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="flex justify-center items-stretch w-full"
            >
              <CollectionCard
                title={collection.title}
                description={collection.description}
                image={collection.image}
                video={collection.video}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted
                autoPlay
              />
            </div>*/}
        <div className="mt-[33px] w-full grid grid-cols-2 justify-between items-center gap-x-[3px] md:gap-x-[17.17px] xl:gap-x-[30px] gap-y-[20.32px] md:gap-y-[19.46px] xl:gap-y-[34px]">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="flex justify-center items-stretch w-full"
            >
              <CollectionCard
                title={collection.title}
                description={collection.description}
                image={collection.image}
                video={collection.video}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted
                autoPlay
              />
            </div>
          ))}
        </div>
      </div>
      {/* Hydroponic Kits */}
      <div
        className="mt-[20.32px] md:mt-[112.85px] xl:mt-[120px] md:max-w-[754px] w-full xl:max-w-[1200px] flex flex-col justify-center items-center"
        style={{ paddingLeft: "0%" }}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className="max-w-[320px] md:max-w-[754px] xl:max-w-[1200px] w-full flex flex-col justify-center items-center text-[40px] md:text-4xl xl:text-[50px] leading-[48px] md:leading-[43.2px] xl:leading-[43.2px] -tracking-[1px] md:-tracking-[0.9px] font-normal capitalize text-[#3D3D3D]">
            <p>Why are our hydroponic kits the best for you?</p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden mt-12 md:mt-[38px] xl:mt-12 w-full md:grid md:grid-cols-2 xl:grid-cols-3 gap-y-[41px] md:gap-x-[22px] md:gap-y-[47px] xl:gap-x-[41px] xl:gap-y-12 justify-center items-center hydrophonic-kit">
            {hydroponics.map((hydroponic, index) => (
              <HydroponicCard
                key={index}
                data={hydroponic}
                index={index}
                isActive={index === currentIndex}
              />
            ))}
          </div>

          {/* Mobile Slider View */}
          <div
            className="relative w-full h-[350px] mt-10 mb-8 flex justify-center items-center md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {hydroponics.map((card, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 z-10 translate-x-0"
                    : index < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <HydroponicCard
                  data={card}
                  index={index}
                  isActive={index === currentIndex}
                />
              </div>
            ))}

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-7 flex space-x-2">
              {hydroponics.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === currentIndex
                      ? "bg-primaryMain w-4"
                      : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="md:mt-[72.12px] w-full flex flex-col justify-center items-center">
            <Link href="/about-us" passHref>
              <button className="text-base px-[42px] py-[18px] rounded-[100px] border-[1px] font-normal border-primaryGrayscale text-primaryGrayscale">
                About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* How Does it Work */}
      <div
        className="mt-[15px] md:mt-[132px] xl:mt-[149.5px] w-full h-fit md:max-w-[754px] xl:max-w-[1098px] flex xl:gap-[98px] flex-col md:flex-row justify-center items-center"
        style={{ paddingLeft: "0%" }}
      >
        <div className="w-full md:-mt-[210px] max-w-[361px] xl:max-w-[630px] flex flex-col">
          <p className="w-fit text-[40px] md:text-4xl xl:text-[50px] leading-[48px] md:leading-[48px] xl:leading-[60px] -tracking-[1px] xl:-tracking-[1.25px] font-normal capitalize text-primaryGrayscale">
            How does it work?
          </p>

          <div className="mt-[41.5px] max-w-[316px] xl:max-w-[630px] flex flex-col gap-y-6">
            <div className="w-full flex gap-x-4">
              <div>
                <div className="w-[35px] h-[35px] text-base leading-[19.2px] -tracking-[0.4px] font-normal flex justify-center items-center rounded-full text-[#FDFDFD] bg-[#809D79]">
                  1
                </div>
              </div>

              <div>
                <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                  Pour
                </p>
                <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
                  Open the Lid of the Pot and carefully pour freshwater into the
                  reservoir.
                </p>
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div>
                <div className="w-[35px] h-[35px] text-base leading-[19.2px] -tracking-[0.4px] font-normal flex justify-center items-center rounded-full text-[#FDFDFD] bg-[#809D79]">
                  2
                </div>
              </div>

              <div>
                <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                  Pest Free
                </p>
                <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
                  Close the Lid to keep it Mosquito & Pest Free.
                </p>
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div>
                <div className="w-[35px] h-[35px] text-base leading-[19.2px] -tracking-[0.4px] font-normal flex justify-center items-center rounded-full text-[#FDFDFD] bg-[#809D79]">
                  3
                </div>
              </div>

              <div>
                <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                  Optimal water
                </p>
                <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
                  Via the capillary action, Your plant gets optimal water when
                  required.
                </p>
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div>
                <div className="w-[35px] h-[35px] text-base leading-[19.2px] -tracking-[0.4px] font-normal flex justify-center items-center rounded-full text-[#FDFDFD] bg-[#809D79]">
                  4
                </div>
              </div>

              <div>
                <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                  Water check
                </p>
                <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
                  Check if a water refill is needed. Not every week. Just once
                  on an average of 45-60 days.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex mt-3 md:mt-8 w-full text-base font-medium gap-7 justify-center xl:justify-start items-center">
            <Link href="/store" passHref>
              <button className="px-[42px] py-[18px] rounded-[100px] text-white bg-primaryMain">
                Shop now
              </button>
            </Link>
            <Link href="/about-us" passHref>
              <button className="px-[42px] py-[18px] text-primaryGrayscale border-[1px] border-primaryGrayscale rounded-[100px] bg-transparent">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-col xl:w-full justify-center items-center">
          <div className="w-[240px] h-[240px] md:w-[195px] md:h-[195px] flex flex-col justify-center items-center rounded-full bg-[#F3F0F1] border-[3px] border-primaryMain overflow-hidden">
            <Image
              className="object-cover"
              src="https://res.cloudinary.com/dguzhztdt/image/upload/v1729191093/Auto%20Verdure%20media%20%28website%29/Product%20Media/DSC04309_l5wrqp.jpg"
              alt="pour"
              width={240}
              height={240}
            />
          </div>
          <div className="w-[240px] h-[240px] md:w-[195px] md:h-[195px] flex flex-col justify-center items-center relative bottom-[90px] left-[160px] rounded-full bg-[#F3F0F1] border-[3px] border-primaryMain overflow-hidden">
            <Image
              className="object-cover"
              src="/pest1.jpg"
              alt="pestFree"
              width={240}
              height={240}
            />
          </div>
          <div className="w-[240px] h-[240px] md:w-[195px] md:h-[195px] flex flex-col justify-center items-center relative bottom-[170px] left-[20px] rounded-full bg-[#F3F0F1] border-[3px] border-primaryMain overflow-hidden">
            <Image
              className="object-cover"
              src="/DSC0431555.JPG"
              alt="check"
              width={240}
              height={240}
            />
          </div>
        </div>
      </div>
      {/* Join the Auto Verdure Movement */}
      <div className="mt-[107.5px] md:mt-[72px] max-w-[361px] md:max-w-[754px] xl:max-w-[1226px] w-full h-full">
        <div
          className="hidden w-full h-[432px] xl:h-[500px] md:flex gap-x-5 xl:gap-[54px] justify-center items-center xl:items-start"
          style={{ paddingLeft: "9%" }}
        >
          {/* Video Container */}
          <div className="relative w-[366px] h-[432px] xl:w-[604px] xl:h-[500px] xl:flex-1 overflow-hidden">
            <video
              className="w-full h-full rounded-[16px] object-cover "
              src="/home1.mp4"
              autoPlay
              alt="video"
              playsInline
              loop
              muted
            />
          </div>

          {/* Image and Text Container */}
          <div className="w-[366px] h-[442px] xl:h-full flex xl:flex-1 flex-col gap-y-2 xl:gap-y-8">
            <div className="w-full flex flex-col gap-3">
              <p className="text-4xl xl:text-[50px] leading-[43.2px] xl:leading-[60px] -tracking-[0.9px] xl:-tracking-[1.25px] font-normal text-primaryGrayscale">
                Explore a world where each leaf whispers a tale of wellness &
                warmth!
              </p>
              <p className="text-sm leading-6 font-normal text-secondaryGrayscale mt-1">
                Here, you&apos;ll discover the perfect harmony of nature&apos;s
                warmth within the confines of your home.
              </p>
            </div>

            {/* Image Grid */}
            <div className="w-full h-[432px] xl:h-full flex gap-[21.5px] justify-between xl:justify-normal xl:gap-6 mt-3">
              <video
                className="object-cover w-[192px] h-[205px] xl:w-[192px] xl:h-[205px] rounded-[16px] md:w[192px] md:h-[180px]"
                src="https://res.cloudinary.com/dguzhztdt/video/upload/f_mp4/v1729091741/Auto%20Verdure%20media%20%28website%29/Plants/IMG_7939_wsnkj9.mov"
                alt="video"
                // width={604}
                // height={521}
                autoPlay
                playsInline
                loop
                muted
              />
              <Image
                className="w-[192px] h-[205px] xl:w-[192px] xl:h-[205px] rounded-[16px] md:w[192px] md:h-[180px]"
                src="https://res.cloudinary.com/dguzhztdt/image/upload/f_auto/v1729091744/Auto%20Verdure%20media%20%28website%29/Plants/IMG_1297_cy22gd.heic"
                alt="image2"
                width={192}
                height={205}
              />
            </div>
          </div>
        </div>

        <div className="mt-[58px] hidden w-full md:flex flex-col justify-center items-center md:mt-[100px]">
          <Link href="/about-us" passHref>
            <button className="text-base px-[42px] py-[18px] rounded-[100px] border-[1px] border-primaryGrayscale font-normal text-primaryGrayscale">
              About Us
            </button>
          </Link>
        </div>

        <div className="md:hidden w-full flex flex-col gap-5">
          <p className="text-[40px] leading-[48px] -tracking-[1px] font-normal text-primaryGrayscale">
            Join the Auto Verdure Movement to Transform Indoor & Outdoor Urban
            Plant Growing.
          </p>
          <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
            No Contaminants. Only Nutrient-Packed Produce.
          </p>
        </div>

        {/* Video and Image */}
        <div className="md:hidden mt-8 w-full flex flex-col gap-8">
          <div className="max-w-[361px] h-[180.5px] rounded-[14.1px] ">
            <video
              className="w-full h-full rounded-[16px] object-cover "
              src="https://res.cloudinary.com/dguzhztdt/video/upload/f_mp4/v1729091741/Auto%20Verdure%20media%20%28website%29/Plants/IMG_7939_wsnkj9.mov"
              alt="video"
              // width={604}
              // height={521}
              autoPlay
              playsInline
              loop
              muted
            />
          </div>

          <div className="w-full flex justify-between gap-6">
            <video
              className="object-cover rounded-[16px] w-[171.765px] h-[183.395px] "
              src="/home1.mp4"
              alt="video"
              autoPlay
              playsInline
              loop
              muted
            />
            <Image
              className="rounded-[16px] w-[171.765px] h-[183.395px] sm:w-[140px] sm:h-[150px]"
              src="https://res.cloudinary.com/dguzhztdt/image/upload/f_auto/v1729091744/Auto%20Verdure%20media%20%28website%29/Plants/IMG_1297_cy22gd.heic"
              alt="img"
              width={171.765}
              height={183.395}
              style={{ width: "171.765px", height: "183.395px" }}
            />
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <button className="text-base px-[42px] py-[18px] rounded-[100px] border-[1px] font-normal text-primaryGrayscale">
              About Us
            </button>
          </div>
        </div>

        <div className="mt-[59.11px] w-full flex flex-col md:gap-y-7 justify-center items-center">
          <div className="w-full flex flex-col md:flex-row-reverse md:gap-[56.67px] justify-center">
            <div className=" w-full md:w-[405px] xl:w-[646.66px] hidden md:flex flex-col justify-center items-center md:justify-start md:items-start">
              <video
                className="object-cover rounded-[16px]"
                src="/pdr.mp4"
                alt="powerful design research"
                playsInline
                muted
                autoPlay
                loop
                width={646.67}
                height={300}
                style={{ width: "646.67px", height: "300px" }}
              />
              <div className="mt-[30px] w-full">
                <p className="text-2xl leading-[48px] -tracking-[0.6px] text-primaryMain font-bold">
                  Powerful design research
                </p>
                <p className="mt-[10px] text-xl leading-8 -tracking-[0.5px] font-normal text-secondryGrayscale">
                  We are the first in the Indian Market to combat the rising
                  concern of mosquito-induced diseases by integrating the
                  solution into our design research.
                </p>
              </div>
            </div>

            <div className="mt-[59px] md:mt-0 w-full md:w-[293.34px] hidden md:flex flex-col justify-center items-center md:justify-start md:items-start">
              <Image
                className="object-cover rounded-[16px]"
                src="/water.jpg"
                alt="image"
                width={293.34}
                height={300}
                style={{ width: "293.34px", height: "300px" }}
              />
              <div className="mt-[30px] w-[237px]">
                <p className="text-2xl leading-[48px] -tracking-[0.6px] text-primaryMain font-bold">
                  Water Retention
                </p>
                <p className="mt-[10px] text-xl leading-8 -tracking-[0.5px] font-normal text-secondryGrayscale">
                  We have successfully developed an unmatchable Water Retention
                  Technology amongst all the Hydroponic system competitors.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden w-full md:flex md:gap-[56.67px] justify-center">
            <div className="w-full md:w-[405px] xl:w-[646.66px] hidden md:flex flex-col justify-center items-center md:justify-start md:items-start">
              <Image
                className="rounded-[16px]"
                src="/RJP00792.JPG"
                alt="image"
                width={646.66}
                height={300}
                playsInline
                style={{ width: "646.66px", height: "300px" }}
              />
              <div className="mt-[30px] w-full">
                <p className="text-2xl leading-[48px] -tracking-[0.6px] text-primaryMain font-bold">
                  Aesthetic Appeal
                </p>
                <p className="mt-[10px] text-xl leading-8 -tracking-[0.5px] font-normal text-secondryGrayscale">
                  Elevate your home or office with our diverse selection of
                  indoor plants. From graceful succulents to verdant ferns, our
                  self-watering pots add a touch of natural beauty to your
                  surroundings, enhancing your space with an eye-catching allure
                </p>
              </div>
            </div>

            <div className="mt-[59px] md:mt-0 w-full md:w-[293.34px] hidden md:flex flex-col justify-center items-center md:justify-start md:items-start">
              <video
                className="object-cover rounded-[16px]"
                src="/expert.mp4"
                alt="video"
                // width={604}
                height={300}
                autoPlay
                playsInline
                loop
                muted
                style={{ width: "646.66px", height: "300px" }}
              />

              <div className="mt-[30px] w-[237px]">
                <p className="text-2xl leading-[48px] -tracking-[0.6px] text-primaryMain font-bold">
                  Expert Guidance
                </p>
                <p className="mt-[10px] text-xl leading-8 -tracking-[0.5px] font-normal text-secondryGrayscale">
                  And YES, Just Like you, we are Passionate about Plants- We
                  Bring you Expert Guidance to provide proper care to your
                  Plants.
                </p>
              </div>
            </div>
          </div>
          <Power />
        </div>

        {/* Why should you switch from traditional pots to hydroponics? */}
        <div className="mt-[88px] md:mt-[122px] xl:mt-[74px] max-w-[361px] md:max-w-[754px] xl:max-w-[1200px] w-full flex flex-col justify-center items-center px-4 md:px-0">
          <div className="w-full md:w-[467px] xl:w-[649px]">
            <p className="text-[40px] md:text-4xl xl:text-[50px] leading-[40px] md:leading-[48px] xl:leading-[60px] -tracking-[1px] xl:-tracking-[1.25px] text-left font-normal text-[#3D3D3D]">
              Why should you switch from traditional pots to hydroponics?
            </p>
          </div>
          <HydroponicComparison />
        </div>
        {/* Loved By Buyers */}
        <ProductShowcase />

        {/* Join THE AV Family  World's first customizable hydroponic pots. */}
        <div className="mt-[80px] md:mt-[160px] max-w-[361px] md:max-w-[754px] xl:max-w-[991px] w-full flex flex-col justify-center items-center mx-auto">
          <div className=" max-w-[361px] md:max-w-[754px] xl:max-w-[1065px] w-full flex flex-col gap-5">
            <p className="text-[40px] md:text-4xl leading-[48px] -tracking-[1px] md:text-center font-normal text-primaryGrayscale">
              Join the AV Family <br className="hidden md:block" /> World&apos;s
              first customizable hydroponic pots.
            </p>
            <p className="w-[272px] md:w-full text-[14px] leading-6 text-left xl:text-center font-normal text-secondaryGrayscale">
              &quot;Unlock The Biophile Inside You: Embrace Your Connection With
              Nature !&quot;
            </p>
          </div>

          <div className="mt-[90px] flex flex-col xl:flex-row xl:gap-[29px] justify-center items-center">
            <Image
              className="hidden xl:flex cursor-pointer"
              src="/leftArrow1.svg"
              alt="leftArrow1"
              width={13}
              height={26}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                WebkitUserSelect: "none",
                userSelect: "none",
                pointerEvents: "none",
                WebkitTouchCallout: "none",
                WebkitUserDrag: "none",
              }}
            />
            <Testimonial />
            <Image
              className="hidden xl:flex cursor-pointer"
              src="/rightArrow1.svg"
              alt="rightArrow1"
              width={13}
              height={26}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                WebkitUserSelect: "none",
                userSelect: "none",
                pointerEvents: "none",
                WebkitTouchCallout: "none",
                WebkitUserDrag: "none",
              }}
            />
          </div>

          <div className="hidden mt-[109.5px] w-full md:flex flex-col justify-center items-center">
            <Link href="/community" passHref>
              <div className="w-[1595px] flex justify-center items-center gap-10 overflow-hidden">
                <Image
                  className="object-contain w-[505px] h-[413px]"
                  src="/testimonial1.png"
                  alt="img"
                  width={505}
                  height={413}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    pointerEvents: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserDrag: "none",
                  }}
                />
                <Image
                  className="object-contain w-[505px] h-[413px]"
                  src="/testimonial1.png"
                  alt="img"
                  width={505}
                  height={413}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    pointerEvents: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserDrag: "none",
                  }}
                />
                <Image
                  className="object-contain w-[505px] h-[413px]"
                  src="/testimonial1.png"
                  alt="img"
                  width={505}
                  height={413}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    pointerEvents: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserDrag: "none",
                  }}
                />
              </div>
            </Link>

            <div className="mt-[43px] w-full flex gap-10 justify-center items-center">
              <Image
                src="/leftArrow1.svg"
                alt="leftArrow1"
                width={13}
                height={26}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none",
                }}
              />
              <Image
                src="/rightArrow1.svg"
                alt="rightArrow1"
                width={13}
                height={26}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none",
                }}
              />
            </div>
          </div>

          <div className="mt-[20px] md:mt-[72.12px] w-full flex flex-col justify-center items-center">
            <Link
              href="/community"
              className="text-base px-[42px] py-[18px] rounded-[100px] border-[1px] font-normal border-primaryGrayscale hover:bg-[#000000] text-primaryGrayscale hover:text-[#ffffff] ease-in-out duration-500"
            >
              Community
            </Link>
          </div>
        </div>

        {/* What we offer ? */}
        <div className="mt-[80px] md:mt-[160px] max-w-[361px] md:max-w-[754px] xl:max-w-[991px] w-full flex flex-col justify-center items-center mx-auto">
          <p className="text-[50px] md:text-4xl xl:text-[50px] leading-[60px] md:leading-[43.2px] xl:leading-[60px] -tracking-[1.25px] md:-tracking-[0.9px] xl:-tracking-[1.25px] font-normal text-primaryGrayscale">
            What we offer ?
          </p>

          {/* Content */}
          <div className="mt-[64px] w-full flex flex-col md:flex-row gap-[60px]">
            <div className="w-full flex flex-col gap-4 justify-center items-center md:justify-start">
              <Image
                className="md:w-[48px] md:h-[48px]"
                src="/drugs.png"
                alt="img"
                width={80}
                height={80}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none",
                }}
              />

              <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                Aesthetic Appeal
              </p>
              <p className="text-sm leading-6 text-center font-normal text-secondaryGrayscale">
                Elevate your home or office with our diverse selection of indoor
                plants. From graceful succulents to verdant ferns, our
                self-watering pots add a touch of natural beauty to your
                surroundings, enhancing your space with an eye-catching allure.
              </p>
            </div>
            <div className="w-full flex flex-col gap-4 justify-center items-center md:justify-start">
              <Image
                className="md:w-[48px] md:h-[48px]"
                src="/warranty.png"
                alt="img"
                width={80}
                height={80}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none",
                }}
              />

              <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                Lifetime Warranty
              </p>
              <p className="text-sm leading-6 text-center font-normal text-secondaryGrayscale">
                Auto Verdure Hydroponic & Semi-Hydroponic kits offer lifetime
                guarantee. If your kit arrives damaged or in a defected state,
                we will accordingly provide a replacement for it.
              </p>
            </div>
            <div className="w-full flex flex-col gap-4 justify-center items-center md:justify-start">
              <Image
                className="md:w-[48px] md:h-[48px]"
                src="/agriculture.png"
                alt="img"
                width={80}
                height={80}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none",
                }}
              />

              <p className="text-2xl leading-[28.8px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
                Physical Wellness
              </p>
              <p className="text-sm leading-6 text-center font-normal text-secondaryGrayscale">
                Immerse yourself in a cleaner, healthier environment with our
                innovative self-watering pots. These pots not only keep your
                plants thriving but also act as natural air purifiers, absorbing
                toxins and releasing refreshing oxygen. Embrace the vitality of
                a lush indoor garden while enjoying improved physical wellness.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-[52px] md:mt-8 w-full text-base font-medium flex gap-7 justify-center items-center">
            <Link href="/store" passHref>
              <button className="px-[42px] py-[18px] rounded-[100px] text-white bg-primaryMain">
                Shop now
              </button>
            </Link>
            <Link href="/about-us" passHref>
              <button className="px-[42px] py-[18px] text-primaryGrayscale border-[1px] border-primaryGrayscale rounded-[100px] bg-transparent">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Blogs */}
        <Displayblogs
          title="Explore Our Blog for Green Inspiration"
          description="Our blog is filled with informative and inspiring content on all things green. From plant care tips and advice to the latest trends in gardening and design, our experts share their knowledge to help you bring your indoor and outdoor spaces to life."
        />
        {/* Contact */}
        <Contact />
      </div>
      {
        <div className="fixed bottom-4 right-4 z-50">
          <Chatbot />
        </div>
      }

      {/* <div>
        <Script
          src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://files.bpcontent.cloud/2024/12/17/19/20241217191144-QELXVVOO.js"
          strategy="lazyOnload"
        />
      </div> */}

      {/* IBM Watson Assistant */}
      {/* {useEffect(() => {
        window.watsonAssistantChatOptions = {
          integrationID: "e090b9a0-0723-47e0-9df2-61d7307d4bda",
          region: "jp-tok",
          serviceInstanceID: "305b8f41-31f1-4bc8-a5b6-1ed8a8cb069a",
          onLoad: async (instance) => {
            await instance.render();
          },
        };
        const script = document.createElement("script");
        script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js`;
        document.head.appendChild(script);
        return () => {
          document.head.removeChild(script);
        };
      }, [])} */}
    </div>
  );
}
