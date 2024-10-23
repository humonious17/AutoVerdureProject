"use client";
import Image from "next/image";
import React, { useState } from "react";

const HydroponicCard = ({ data, isActive }) => {
  return (
    <div
      className={isActive? "max-w-[373px] h-[315px] md:w-full md:h-[308.96px] xl:w-[373px] xl:h-[315px] px-8 pt-[52px] pb-[75px] rounded-3xl bg-primaryMain text-white ease-in-out duration-200" : "max-w-[373px] h-[315px] md:w-full md:h-[308.96px] xl:w-[373px] xl:h-[315px] px-8 pt-[52px] pb-[75px] rounded-3xl bg-primaryCream ease-in-out duration-200"}
    >
      <Image
        className={isActive ? "object-contain md:w-[39.233px] md:h-[39.22px] text-[#BABABA]" : "object-contain md:w-[39.233px] md:h-[39.22px]"}
        src={isActive ? (data.img.split(".")[0] + "White.svg") : data.img}
        alt={data.title}
        width={40}
        height={40}
      />
      <div className="mt-[39px] max-w-[309px] md:w-[303.075px] xl:w-[309px]">
        <p
          className={
            isActive
              ? "text-2xl md:text-[23.54px] xl:text-2xl leading-[28.8px] md:leading-[28.248px] xl:leading-[28.8px] -tracking-[0.6px] md:-tracking-[0.588px] xl:-tracking-[0.6px] font-[600] ease-in-out duration-200 text-white"
              : "text-2xl md:text-[23.54px] xl:text-2xl leading-[28.8px] md:leading-[28.248px] xl:leading-[28.8px] -tracking-[0.6px] md:-tracking-[0.588px] xl:-tracking-[0.6px] font-[600] ease-in-out duration-200 text-primaryGrayscale"
          }
        >
          {data.title}
        </p>
        <p
          className={
            isActive
              ? "mt-2 text-sm md:text-[13.732px] xl:text-sm leading-6 md:leading-[23.54px] xl:leading-6 font-normal ease-in-out duration-200 text-white"
              : "mt-2 text-sm md:text-[13.732px] xl:text-sm leading-6 md:leading-[23.54px] xl:leading-6 font-normal ease-in-out duration-200 text-#6F6E73"
          }

          style={!isActive 
            ? {color: "#3D3D3D",color: "color(display-p3 0.2375 0.2375 0.2375)",textAlign: "left",fontFamily: "Urbanist",fontSize: "16px",fontStyle: "normal",fontWeight: 425,lineHeight: "24px"}
            : {color: "white",textAlign: "left",fontFamily: "Urbanist",fontSize: "16px",fontStyle: "normal",fontWeight: 425,lineHeight: "24px"}
          }
        >
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default HydroponicCard;
