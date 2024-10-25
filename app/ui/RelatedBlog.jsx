'use client'
import React, { useRef, useState } from "react";
import GuideCard from "./GuideCard.jsx/GuideCard";
import Link from "next/link";
import { guides } from "../constant/data";
import Image from "next/image";

const RelatedBlog = ({ title, description }) => {

  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollLeft = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex-1)
    }

    if (containerRef.current) {
      containerRef.current.scrollBy((currentIndex === 1) ? { left: -(300.35 + ((containerRef.current.offsetWidth - 900)/4)), behavior: 'smooth' } : { left: -(300 + ((containerRef.current.offsetWidth - 900)/4)), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    setCurrentIndex(currentIndex+1)
    if (containerRef.current) {
      containerRef.current.scrollBy(((currentIndex === 0) ? { left: (300.35 + ((containerRef.current.offsetWidth - 900)/4)), behavior: 'smooth' } : { left: (300 + ((containerRef.current.offsetWidth - 900)/4)), behavior: 'smooth' }));
    }
  };

  
  return (
    <div className="w-full px-4 md:px-[70px] xl:px-[120px] 2xl:px-[250px] flex flex-col justify-center items-center">
      <div className="mt-20 w-full flex flex-col justify-center items-center">
        <div className="sm:w-[352px] md:w-full xl:w-[872px] flex flex-col gap-5 justify-center items-center md:justify-center md:items-center md:text-center">
          <p className="text-[40px] leading-[48px] -tracking-[1px] text-primaryGrayscale font-normal capitalize text-center">
            {title}
          </p>
          <p className="text-sm leading-6 font-normal text-secondaryGrayscale text-center md:text-center">
            {description}
          </p>
        </div>

        <div className="relative mt-12 w-full overflow-hidden">
          <div ref={containerRef} className="flex gap-x-[20px] overflow-hidden no-scrollbar" style={{columnGap: "calc((100% - 900px)/4)"}}>
            <div></div>
            {guides.map((guide, index) => (
              <GuideCard guide={guide} key={index} className="flex-shrink-0 w-[300px]" />
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


        {/* <div className="mt-12 gap-y-[41px] md:gap-y-[57px] xl:gap-y-[73px] md:gap-x-[55px] xl:gap-x-[41px]">
          {guides.map((guide, index) => (
            <div style={{width: '300px'}}>
              <GuideCard guide={guide} key={index} />
            </div>
          ))}
        </div> */}
      </div>

      {/* Explore More */}
      <div className="mt-[33px] w-fit px-[42px] py-[18px] text-base font-normal border-[1px] border-primaryGrayscale rounded-[100px] cursor-pointer">
        <Link href="/resources">Explore More</Link>
      </div>
    </div>
  );
};

export default RelatedBlog;
