import Image from "next/image";
import React from "react";

const Explore = () => {
  return (
    <div className="w-full flex justify-center px-4 xl:px-[80px] 2xl:px-[100px] mt-16">
      <div
        className="w-full max-w-[1200px] mt-[20px] px-[20px] pt-[20px] pb-[20px] 
        xl:pl-[30px] xl:pr-[50px] xl:pt-[20px] xl:pb-[20px] 
        rounded-[24px] bg-primaryCream 
        md:flex flex-col xl:flex-row relative"
        style={{ height: "auto" }}
      >
        {/* Decorative Image - blink */}
        <div className="absolute -top-6 right-[30px] md:top-[18px] lg:top-[0px] xl:-top-[17px] md:right-[20px] xl:left-[450px]">
          <Image src="/blink.svg" alt="blink" width={56} height={56} />
        </div>

        {/* Image on the left */}
        <div className="hidden xl:flex">
          <div className="w-[433px] h-[372px]">
            <Image
              src="/call.png"
              alt="call"
              width={433}
              height={372}
              style={{
                borderRadius: "25px",
                marginTop: "10px",
                marginLeft: "12px",
              }}
            />
          </div>
        </div>

        {/* Decorative leaf image */}
        <div className="hidden xl:flex w-[60px] h-[44px] absolute left-[480px] bottom-[180px]">
          <Image
            className="object-contain -rotate-45"
            src="/leaf.png"
            alt="leaf"
            width={60}
            height={44}
          />
        </div>

        {/* Text content */}
        <div className="w-full xl:max-w-[500px] xl:ml-[100px] flex flex-col justify-center">
          <p className="mb-4 text-[30px] leading-[36px] -tracking-[0.5px] font-normal flex flex-col">
            <span>Book a call with an expert to</span>
            <span>guide you through auto farming</span>
            <span>For a desired healthier lifestyle</span>
          </p>

          <p className="w-full text-sm leading-5 font-normal text-secondaryGrayscale">
            At Auto Verdure, we know that selecting the right plants for your
            space can be a daunting task. That&apos;s why we offer personalized
            plant consultation services to help you make informed decisions
            about your indoor and outdoor greenery.
          </p>
          <div className="mt-4 w-fit px-[30px] py-[14px] rounded-[100px] text-base bg-primaryMain text-white font-normal cursor-pointer">
            <p>Contact us</p>
          </div>
        </div>

        {/* Decorative zig-zag image */}
        <div className="absolute -bottom-[15px] right-[10px] xl:bottom-7 xl:left-[390px]">
          <Image src="/zigzag.svg" alt="zig-zag" width={99} height={99} />
        </div>
      </div>
    </div>
  );
};

export default Explore;