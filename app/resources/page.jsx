"use client";
import React, { useState } from "react";
import GuideCard from "../ui/GuideCard.jsx/GuideCard";
import { guides } from "../constant/data";
import Image from "next/image";
import ResourcesNavbar from "../ui/ResourcesNavbar";
import Blogs from "@/pages/Blogs";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="w-full px-4 md:px-[27px] xl:px-[119.99px] 2xl:px-[230px] bg-[#FFFBF7]">
      <ResourcesNavbar onCategoryChange={setSelectedCategory} />
      <Blogs selectedCategory={selectedCategory} />

      {/* Contact Us */}
      <div className="w-full mt-[107px] px-[23px] pt-[39px] pb-[20px] xl:px-[100px] xl:pt-[110px] xl:pb-[94px] rounded-[24px] bg-primaryCream md:flex flex-col justify-center items-center">
        <p className="mb-4 text-[32px] leading-[48px] -tracking-[0.8px] font-normal md:text-center">
          Book a call with an expert to guide you through auto farming For a
          desired healthier lifestyle
        </p>
        <p className="xl:w-[805px] text-sm leading-6 font-normal text-secondaryGrayscale xl:text-center">
          At Auto verdure, we know that selecting the right plants for your
          space can be a daunting task. That&apos;s why we offer personalized
          plant consultation services to help you make informed decisions about
          your indoor and outdoor greenery.
        </p>
        <div className="mt-6 w-fit px-[42px] py-[18px] rounded-[100px] text-base text-white bg-primaryMain font-normal cursor-pointer">
          <p>Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
