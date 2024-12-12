"use client";
import Image from "next/image";
import React from "react";

const HydroponicCard = ({ data, isActive, index }) => {
  // Check if the screen size is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768; // To ensure we're on the client-side and the code works in Next.js

  // Determine the background color based on the card index for mobile screens
  const getMobileBackgroundColor = () => {
    if (!isMobile) return "";

    // Alternating between primaryMain and primaryCream for mobile
    if (isActive) return "bg-primaryMain"; return  "bg-primaryCream" ;
   
  };

  return (
    <div
      className={`max-w-[373px] h-[315px] md:w-full md:h-[308.96px] xl:w-[373px] xl:h-[315px] px-8 pt-[52px] pb-[75px] rounded-3xl ease-in-out duration-200 
        ${
          isActive
            ? "bg-primaryMain text-white"
            : isMobile
            ? getMobileBackgroundColor()
            : "bg-primaryCream"
        }`}
    >
      <Image
        className={`object-contain md:w-[39.233px] md:h-[39.22px] ${
          isActive ? "text-[#BABABA]" : ""
        }`}
        src={isActive ? `${data.img.split(".")[0]}White.svg` : data.img}
        alt={data.title}
        width={40}
        height={40}
      />
      <div className="mt-[39px] max-w-[309px] md:w-[303.075px] xl:w-[309px]">
        <p
          className={`text-2xl md:text-[23.54px] xl:text-2xl leading-[28.8px] md:leading-[28.248px] xl:leading-[28.8px] -tracking-[0.6px] md:-tracking-[0.588px] xl:-tracking-[0.6px] font-[600] ease-in-out duration-200 ${
            isActive ? "text-white" : "text-primaryGrayscale"
          }`}
        >
          {data.title}
        </p>
        <p
          className={`mt-2 text-sm md:text-[13.732px] xl:text-sm leading-6 md:leading-[23.54px] xl:leading-6 font-normal ease-in-out duration-200 ${
            isActive ? "text-white" : "text-#6F6E73"
          }`}
          style={{
            textAlign: "left",
            fontFamily: "Urbanist",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 425,
            lineHeight: "24px",
            color: isActive
              ? "white"
              : "color(display-p3 0.2375 0.2375 0.2375)",
          }}
        >
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default HydroponicCard;
