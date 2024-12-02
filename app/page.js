/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { collections, hydroponics } from "./constant/data";
import HydroponicCard from "./ui/Home/HydroponicCard";
import CollectionCard from "./ui/Home/CollectionCard";
import { BiCheck, BiX } from "react-icons/bi";
import Loved from "./ui/Home/Loved";
import Testimonial from "./ui/Home/Testimonial";
import Displayblogs from "./ui/Store/Displayblogs";
import Contact from "./ui/Home/Contact";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Chatbot from "./ChatBot";
import { useSwipeable } from "react-swipeable";
import Power from "./ui/Home/Power";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./globals.css";
import ProductShowcase from "./ui/Home/ProductShowcase";

import Blogs from "@/pages/Blogs";

const Page = () => {
  return (
    <div>
      <div
        style={{
          height: "495px",
          width: "8px",
          marginLeft: "84.35%",
          background: "#FFFCF8",
          top: "0px",
          animation: "shrinkHeightRight 2s forwards",
          animationDelay: "0.2s",
        }}
      >
        <p>It&apos;s a beautiful day!</p>
      </div>
      <div className="relative">
        <Image
          className="object-cover"
          style={{ transform: "translateX(12px)" }}
          src="/sam222long.png"
          alt="bgImage"
          width={1550}
          height={766}
          onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
        />
        <div
          className="h-[90px] w-[10px] absolute z-15"
          style={{
            height: "560px",
            width: "10px",
            marginLeft: "23.5%",
            background: "#FFFCF8",
            top: "0px",
            animation: "shrinkHeight 2s forwards",
            animationDelay: "0.2s",
          }}
        ></div>
        <div
          className="h-[90px] w-[20px] absolute z-15"
          style={{
            height: "495px",
            width: "8px",
            marginLeft: "84.35%",
            background: "#FFFCF8",
            top: "0px",
            animation: "shrinkHeightRight 2s forwards",
            animationDelay: "0.2s",
          }}
        ></div>
      </div>
    </div>
  );
};

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

  return (
    <div className="w-full px-4 md:px-10 pb-[100px] bg-[#FFFCF8] flex flex-col justify-center items-center overflow-hidden">
      {/* Hero */}
      <div className="w-screen flex flex-col-reverse md:flex-row xl:flex-col justify-center items-center overflow-hidden hero-container">
        <div
          className="max-w-[361px] md:max-w-[500px] xl:max-w-[622px] md:mr-8 mt-[157px] -ml-7 sm:mx-auto md:-ml-[80px] xl:mt-[170px] z-10 gap-6 content-container lg:ml-[115px] lg:mt-[235px]"
          style={{
            paddingRight: "12px",
          }}
        >
          {/* Title */}
          <p
            className="text-[50px] md:text-[50px] xl:text-[64px] leading-[50px] md:leading-[60px] xl:leading-[76.8px] tracking-tight font-normal text-black hero-title text-left lg:text-center xl:text-center"
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
            className="mt-3 xl:mt-[20px] text-sm md:text-base xl:text-lg leading-6 text-left font-normal text-black hero-description lg:text-center xl:text-center"
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
          <div className="mt-3 md:mt-8 w-full text-base font-medium flex gap-5 justify-center xl:justify-center lg:justify-center md:justify-center items-center hero-buttons">
            <Link href="/store" passHref>
              <button
                className="shop-now px-4 md:px-[32px] py-2 md:py-[14px] sm:px-[32px] sm:py-[14px] rounded-[100px] text-white bg-primaryMain text-[16px] md:text-base mobile-button"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                Shop now
              </button>
            </Link>
            <Link href="/about-us" passHref>
              <button
                className="learn-more flex items-center justify-center px-4 md:px-[32px] py-2 md:py-[14px] sm:px-[32px] sm:py-[14px] text-primaryGrayscale border-[1px] border-primaryGrayscale rounded-[100px] bg-transparent text-[16px] md:text-base mobile-button"
                style={{
                  borderRadius: "100px",
                  border: "1px solid var(--Greyscale-Black, #3D3D3D)",
                  whiteSpace: "nowrap",
                }}
              >
                Learn More
              </button>
            </Link>

            <style jsx>{`
              @media (max-width: 640px) {
                .mobile-button {
                  width: auto; /* Adjusts width dynamically */
                  min-width: 160px; /* Ensures a consistent minimum size */
                  height: 55px; /* Fixed height */
                  padding: 18px 24px; /* Adjusted for better spacing */
                  gap: 10px;
                  opacity: 1;
                }
                .hero-buttons {
                  gap: 15px; /* Adjusts gap between buttons for mobile */
                }
              }
            `}</style>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="absolute top-[50px] right-[45px] md:right-[20px] image-container">
        <Image
          className="xl:hidden pot-image scale-[2.2] origin-center transform-gpu"
          src="/ss.png"
          alt="bgImage"
          width={350}
          height={587}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      <div className="w-full h-[766px] absolute top-0 right-[20px] bg-transparent">
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
            src="/sam222long.png"
            alt="bgImage"
            width={1550}
            height={766}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div
            className="h-[90px] w-[10px] absolute z-15"
            style={{
              height: "560px",
              width: "10px",
              marginLeft: "23.5%",
              background: "#FFFCF8",
              top: "0px",
              animation: "shrinkHeight 2s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="h-[90px] w-[20px] absolute z-15"
            style={{
              height: "0px",
              width: "4px",
              marginLeft: "80%",
              background: "#FFFCF8",
              top: "0px",
              animation: "shrinkHeightRight 2s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="absolute"
            style={{
              background: "#FFFCF8",
              top: "395px",
              height: "5px",
              width: "57px",
              marginLeft: "23.4%",
              animation: "shrinkWidthLeft 1.5s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="absolute"
            style={{
              background: "#FFFCF8",
              top: "394px",
              height: "5px",
              width: "57px",
              marginLeft: "82.9%",
              animation: "shrinkWidthRight 1.5s forwards",
              animationDelay: "0.2s",
            }}
          ></div>
        </div>
      </div>
      {/* Shop The New Collection */}
      <div
        className="mt-[78px] md:mt-[114px] xl:mt-[120px] max-w-[361px] md:max-w-[754px] xl:max-w-[1200px] w-full flex flex-col md:justify-center md:items-center"
        style={{ paddingLeft: "2%", marginTop: "20%" }}
      >
        <p className="text-[20.049px] md:text-4xl xl:text-[50px] leading-[24.059px] md:leading-[43.2px] xl:leading-[60px] -tracking-[0.501px] md:-tracking-[0.9px] xl:-tracking-[1.25px] text-primaryGrayscale font-normal capitalize">
          Shop The New Collection
        </p>

        <div className="mt-[33px] w-full grid grid-cols-2 justify-between items-center gap-x-[12px] gap-y-[20.32px] md:gap-x-[17.17px] md:gap-y-[19.46px] xl:gap-x-[30px] xl:gap-y-[34px] bg-[#FFFCF8]">
          {collections.map((collection, index) => (
            <div key={index}>
              <CollectionCard
                title={collection.title}
                description={collection.description}
                image={collection.image}
                video={collection.video}
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
        style={{ paddingLeft: "2%" }}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className="max-w-[320px] md:max-w-[754px] xl:max-w-[1200px] w-full flex flex-col justify-center items-center text-[40px] md:text-4xl xl:text-[50px] leading-[48px] md:leading-[43.2px] xl:leading-[43.2px] -tracking-[1px] md:-tracking-[0.9px] font-normal capitalize text-[#3D3D3D]">
            <p>Why are our hydroponic kits the best for you?</p>
          </div>

          <div className="hidden mt-12 md:mt-[38px] xl:mt-12 w-full flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-y-[41px] md:gap-x-[22px] md:gap-y-[47px] xl:grid-x-[41px] xl:grid-y-12 justify-center items-center hydrophonic-kit">
            {hydroponics.map((hydroponic, index) => (
              <HydroponicCard
                key={index}
                data={hydroponic}
                isActive={index === currentIndex}
              />
            ))}
          </div>
          <div className="relative w-full h-[350px] mt-10 mb-8 flex justify-center items-center md:hidden">
            {/* Mobile View */}
            {hydroponics.map((card, index) => (
              <div
                key={index}
                className={`absolute transition-opacity duration-10000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  transform: `translateY(${index === currentIndex ? 0 : 10}px)`,
                  transition: "transform 0.9s ease-in-out",
                }}
              >
                <HydroponicCard data={card} isActive={index === currentIndex} />
              </div>
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-7 flex space-x-2">
              {hydroponics.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-primaryMain" : "bg-[#FFFCF8]"
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
        style={{ paddingLeft: "3%" }}
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
          className="hidden w-full h-[432px] xl:h-[521px] md:flex gap-x-5 xl:gap-[54px] justify-center items-center xl:items-start"
          style={{ paddingLeft: "9%" }}
        >
          {/* Video Container */}
          <div className="relative w-[366px] h-full xl:w-[604px] xl:h-[521px] xl:flex-1 overflow-hidden">
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
          <div className="w-[366px] h-[432px] xl:h-full flex xl:flex-1 flex-col gap-y-5 xl:gap-y-8">
            <div className="w-full flex flex-col gap-5">
              <p className="text-4xl xl:text-[50px] leading-[43.2px] xl:leading-[60px] -tracking-[0.9px] xl:-tracking-[1.25px] font-normal text-primaryGrayscale">
                Explore a world where each leaf whispers a tale of wellness &
                warmth!
              </p>
              <p className="text-sm leading-6 font-normal text-secondaryGrayscale mt-3">
                Here, you&apos;ll discover the perfect harmony of nature&apos;s
                warmth within the confines of your home.
              </p>
            </div>

            {/* Image Grid */}
            <div className="w-full h-[432px] xl:h-full flex gap-[21.5px] justify-between xl:justify-normal xl:gap-6 mt-6">
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
              <Image
                className="rounded-[16px]"
                src="/imag.jpg"
                alt="image"
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

          <div className="mt-[30px] md:mt-[73px] xl:mt-[82px] w-full flex flex-col justify-center items-center">
            <div className="w-full md:w-[523px] xl:w-fit flex flex-row md:flex-row md:gap-x-5 rounded-[16.4px] space-y-0">
              {/* First Column */}
              <div className="w-full xl:w-[320px] flex flex-col gap-4 text-sm md:text-xs xl:text-sm p-5 font-[600] rounded-[16.4px] shadow-[0_16.412px_49.235px_-2.051px_rgba(0,0,0,0.05)] bg-[#fff]">
                <p className="font-[600]">How we are different.</p>
                <div className="w-full flex flex-col gap-3 text-[#666666]">
                  <p>Plant Watering</p>
                  <p>Minimal Water Wastage</p>
                  <p>Rate of Produce Growth</p>
                  <p>Labour Required</p>
                  <p>No Pest-induced diseases</p>
                  <p>Reduced Carbon Footprint</p>
                  <p>Higher Crop Yield</p>
                </div>
              </div>

              {/* Second Column */}
              <div className="w-full xl:w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-[#FFFCF8] shadow-[0_16.412px_49.235px_-2.051px_rgba(0,0,0,0.05)]">
                <p className="font-[600] text-center text-[#666]">
                  Our Hydroponic Pot
                </p>
                <div className="mt-4 w-full flex flex-col gap-3 items-center">
                  <p className="font-semibold">Once 30-45 Days</p>
                  <BiCheck className="text-[#00FF66] text-xl" />
                  <p className="font-semibold">Faster</p>
                  <p className="font-semibold">Less</p>
                  <div className="flex flex-col gap-3 items-center">
                    {[1, 2, 3, 4].map((_, i) => (
                      <BiCheck key={i} className="text-[#00FF66] text-xl" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Third Column - Hidden on Mobile */}
              <div className="hidden md:flex w-full xl:w-[320px] text-sm p-5 rounded-[16.4px] flex-col bg-[#FFFCF8] shadow-[0_16.412px_49.235px_-2.051px_rgba(0,0,0,0.05)]">
                <p className="font-[600] text-center text-[#666]">
                  Traditional Pots
                </p>
                <div className="mt-4 flex flex-col gap-3 items-center">
                  <p className="font-semibold">Almost Everyday</p>
                  <p className="font-semibold">Overwatering & Underwatering</p>
                  <p className="font-semibold">Slower</p>
                  <p className="font-semibold">More</p>
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map((_, i) => (
                      <BiX key={i} className="text-[#FF0000] text-xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="mt-6 w-full md:hidden bg-[#9A5CF51A] rounded-full p-2">
              <div className="flex justify-between items-center">
                <button className="flex-1 py-2 px-4 rounded-full bg-primaryMain text-white text-sm font-semibold">
                  Our Hydroponics Pot
                </button>
                <button className="flex-1 py-2 px-4 text-sm font-semibold text-[#666]">
                  Traditional Pots
                </button>
              </div>
            </div>
          </div>
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
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>
    </div>
  );
}
