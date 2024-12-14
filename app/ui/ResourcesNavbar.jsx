"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ResourcesNavbar = () => {
  const [resources, setResources] = useState("all");

  return (
    <div className="pt-[120px] md:pt-[124px] xl:pt-[114px] w-full flex flex-col justify-center items-center">
      <div className="max-w-[219px] md:max-w-[382px] w-full relative  ">
        <div>
          <Image
            className="object-contain absolute -top-[10.5px] -left-[70px] md:top-6 md:-left-[120px] xl:-left-[247px] -rotate-45 md:rotate-45 transform scale-x-100 md:-scale-x-100"
            src="/leaf.png"
            alt="leaf"
            unoptimized={true}
            priority={true}
            width={58}
            height={41}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[40px]  md:text-[70px] leading-[48px] md:leading-[80px] -tracking-[1px] md:-tracking-[1.75px] font-normal text-primaryGrayscale">
            <p>Resources</p>
          </div>
          <div className="mt-3 md:mt-6 text-base font-medium">
            <p className="text-secondaryGrayscale ">
              <Link href="/">
                <span className="text-primaryMain">Home</span>
              </Link>{" "}
              / Resources
            </p>
          </div>
        </div>
        <div>
          <Image
            className="object-contain absolute top-[38.5px] -right-[70px] md:-top-[10px] md:-right-[118px] xl:top-[41.5px] xl:-right-[222px] rotate-45 md:-rotate-45"
            src="/leaf.png"
            alt="leaf"
            unoptimized={true}
            priority={true}
            width={58}
            height={41}
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="mt-16 md:mt-[72px] w-full border-[1px] border-black border-opacity-[11%]" />

      {/* Resources Title */}
      <div className="mt-20 md:mt-[70px] xl:mt-[100px] w-full flex flex-col md:gap-5 justify-center items-center">
        <p className="text-[40px] md:text-[50px] leading-[48px] md:leading-[60px] -tracking-[1px] md:-tracking-[1.25px] text-primaryGrayscale text-center font-normal">
          Auto Verdure <br className="md:hidden" /> Resources
        </p>
      </div>

      {/* Resources Navbar */}
      <div className="mt-5 md:mt-8 text-center flex gap-4 md:gap-6 justify-center items-center">
        {/* <div className="flex gap-[38px]"> */}
        <div
          onClick={() => setResources("all")}
          className={
            resources === "all"
              ? "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium capitalize cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
              : "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium text-secondaryGrayscale capitalize cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
          }
        >
          <p>all</p>
        </div>
        <div
          onClick={() => setResources("learning")}
          className={
            resources === "learning"
              ? "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium capitalize cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
              : "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium text-secondaryGrayscale capitalize cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
          }
        >
          <p>learning</p>
        </div>
        {/* </div> */}
        <div
          onClick={() => setResources("guides")}
          className={
            resources === "guides"
              ? "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium capitalize cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
              : "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium text-secondaryGrayscale capitalize cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
          }
        >
          <p>guides</p>
        </div>
        <div
          onClick={() => setResources("articles")}
          className={
            resources === "articles"
              ? "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium capitalize cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
              : "px-[14px] py-[10px] md:px-8 md:py-4 text-xs md:text-base font-medium text-secondaryGrayscale capitalize cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
          }
        >
          <p>articles</p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesNavbar;
