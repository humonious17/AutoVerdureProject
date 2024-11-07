'use client';
import React, { useRef, useState } from "react";
import GuideCard from "./GuideCard.jsx/GuideCard";
import Link from "next/link";
import { guides } from "../constant/data";
import Image from "next/image";

const RelatedBlog = ({ title, description }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }

    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -(300 + (containerRef.current.offsetWidth - 900) / 4),
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    setCurrentIndex(currentIndex + 1);
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300 + (containerRef.current.offsetWidth - 900) / 4,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full px-2 flex flex-col justify-center items-center">
      <div className="mt-20 w-full flex flex-col justify-center items-center">
        <div className="sm:w-[352px] md:w-[500px] xl:w-[872px] flex flex-col gap-5 justify-center items-center md:text-center">
          <p className="text-[40px] leading-[48px] -tracking-[1px] text-primaryGrayscale font-normal capitalize text-center">
            {title}
          </p>
          <p className="text-sm leading-6 font-normal text-secondaryGrayscale text-center">
            {description}
          </p>
        </div>

        <div className="relative mt-12 w-full max-w-[900px] md:max-w-[840px] lg:max-w-[1100px]">
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 lg:gap-14 no-scrollbar"
          >
            {guides.slice(0, 3).map((guide, index) => (
              <GuideCard guide={guide} key={index} className="w-full" />
            ))}
          </div>
        </div>
<div className="mt-[43px] w-full flex gap-10 justify-center items-center">
              <Image
                src="/leftArrow1.svg"
                alt="leftArrow1"
                width={13}
                height={26}
                onClick={scrollLeft}
              />
            <Image
              src="/rightArrow1.svg"
              alt="rightArrow1"
              width={13}
              height={26}
              onClick={scrollRight}
            />
          </div>
        
      </div>

      {/* Explore More */}
      <div className="mt-10 w-fit px-10 py-4 text-base font-normal border border-primaryGrayscale rounded-full cursor-pointer">
        <Link href="/resources">Explore More</Link>
      </div>
    </div>
  );
};

export default RelatedBlog;
