import React from "react";

const Explore = () => {
  return (
    <div className="w-full px-4 md:px-[70px] xl:px-[120px] 2xl:px-[250px]">
      <div className="w-full max-w-[1200px] mx-auto mt-[64.6px] px-[23px] pt-[39px] pb-[20px] xl:px-[100px] xl:pt-[110px] xl:pb-[94px] rounded-[24px] bg-primaryCream md:flex flex-col justify-center items-center text-center">
        <p className="mb-4 text-[32px] leading-[48px] -tracking-[0.8px] font-normal md:text-center">
          Book a call with an expert to guide you through auto farming for a
          desired healthier lifestyle
        </p>
        <p className="xl:w-[805px] text-sm leading-6 font-normal text-secondaryGrayscale md:text-center">
          At Auto Verdure, we know that selecting the right plants for your
          space can be a daunting task. That&apos;s why we offer personalized plant
          consultation services to help you make informed decisions about your
          indoor and outdoor greenery.
        </p>
        <div className="mt-6 w-fit px-[42px] py-[18px] rounded-[100px] text-base bg-primaryMain text-white font-normal cursor-pointer">
          <p>Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
