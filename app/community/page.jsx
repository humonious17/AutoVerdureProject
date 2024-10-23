import Image from "next/image";
import Link from "next/link";
import React from "react";
import Testimonial from "../ui/Community/Testimonial";

const Community = () => {
  return (
    <div className="w-full px-4 pt-[44px] pb-[124px] md:px-[86px] md:py-[116px] xl:px-[119.99px] xl:pt-[114px] xl:pb-[151px] 2xl:px-[200px] 2xl:py-[116px] bg-[#FFFCF8] flex flex-col justify-center items-center overflow-hidden">
      {/* Title */}
      <div className="w-full flex flex-col justify-center items-center relative">
        <div>
          <Image
            className="object-contain absolute top-[0px] left-[0px] md:top-[10px] md:-left-[16px] xl:-top-[13.1px] xl:left-[118px] -rotate-45 md:rotate-45 transform scale-x-100 md:-scale-x-100"
            src="/leaf.png"
            alt="leaf"
            width={58}
            height={41}
          />
        </div>
        {/* <div className="flex flex-col justify-center items-center"> */}
        <div className="w-full md:w-[663px] xl:w-[897px] text-[40px] md:text-[48px] xl:text-[50px] leading-[48px] md:leading-[57.6px] -tracking-[1px] md:-tracking-[1.2px] text-center font-normal capitalize text-primaryGrayscale">
          <p>
            Join THE AV Family <br /> World&apos;s first customizable hydroponic
            pots.
          </p>
          <p className="mt-5 text-sm leading-6 font-normal text-[#6F6E73]">
            &quot; Unlock The Biophile Inside You: Embrace Your Connection With
            Nature ! &quot;
          </p>
        </div>
        {/* </div> */}
        <div>
          <Image
            className="object-contain absolute bottom-[0px] right-[0px] md:-top-[29px] md:-right-[0px] xl:top-[33.85px] xl:-right-[10px] rotate-45 md:-rotate-45"
            src="/leaf.png"
            alt="leaf"
            width={58}
            height={41}
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* For Mobile create carousel in different div */}
        <div className="mt-[52px] md:mt-[82.5px] w-full 2xl:relative 2xl:left-[15%]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-y-5 md:gap-x-[26px] xl:gap-y-6">
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-[87px] md:mt-[110px] xl:mt-[67.5px] w-full flex flex-col">
          <p className="text-[50px] leading-[60px] -tracking-[1.25px] md:text-center capitalize text-primaryGrayscale">
            Gallery
          </p>

          <div className="mt-[25px] w-full flex gap-x-[11px] md:hidden">
            <div className="w-fit flex flex-col gap-y-[11px]">
              <div className="w-[192px] h-[226px]">
                <Image
                  className="w-full h-full rounded-[20px]"
                  src="/testimonial2.png"
                  alt="img"
                  width={192}
                  height={226}
                />
              </div>
              <div className="w-[189px] h-[132px]">
                <Image
                  className="w-full h-full rounded-[20px] object-cover"
                  src="/testimonial2.png"
                  alt="img"
                  width={189}
                  height={132}
                />
              </div>
            </div>
            <div className="w-fit flex flex-col gap-y-[11px]">
              <div className="w-[152px] h-[179px]">
                <Image
                  className="w-full h-full rounded-[20px]"
                  src="/testimonial2.png"
                  alt="img"
                  width={152}
                  height={179}
                />
              </div>
              <div className="w-[152px] h-[179px]">
                <Image
                  className="w-full h-full rounded-[20px]"
                  src="/testimonial2.png"
                  alt="img"
                  width={152}
                  height={179}
                />
              </div>
            </div>
          </div>

          <div className="hidden mt-[60px] w-full md:flex flex-col justify-center items-center">
            <div className="w-[1595px] flex justify-center items-center gap-10 overflow-hidden">
              <Image
                className="object-contain w-[505px] h-[413px]"
                src="/testimonial1.png"
                alt="img"
                width={505}
                height={413}
              />
              <Image
                className="object-contain w-[505px] h-[413px]"
                src="/testimonial1.png"
                alt="img"
                width={505}
                height={413}
              />
              <Image
                className="object-contain w-[505px] h-[413px]"
                src="/testimonial1.png"
                alt="img"
                width={505}
                height={413}
              />
            </div>

            <div className="mt-[43px] w-full flex gap-10 justify-center items-center">
              <Image
                src="/leftArrow1.svg"
                alt="leftArrow1"
                width={13}
                height={26}
              />
              <Image
                src="/rightArrow1.svg"
                alt="rightArrow1"
                width={13}
                height={26}
              />
            </div>
          </div>
        </div>

        {/* Join the Auto Verdure */}
        <div className="hidden md:mt-[94px] xl:mt-[127px] w-full h-[432px] xl:h-[521px] md:flex gap-x-5 xl:gap-[54px] justify-center items-center xl:items-start">
          <div className="w-[366px] h-full xl:w-[604px] xl:h-[521px] xl:flex-1 rounded-[9.7px]">
            <Image
              className="w-[366px] h-full xl:w-[604px] xl:h-[521px]"
              src="/homeImage.png"
              alt="img"
              width={366}
              height={432}
            />
          </div>

          <div className="w-[366px] h-[432px] xl:h-full flex xl:flex-1 flex-col gap-y-5 xl:gap-y-8">
            <div className="w-full flex flex-col gap-5">
              <p className="text-4xl xl:text-[50px] leading-[43.2px] xl:leading-[60px] -tracking-[0.9px] xl:-tracking-[1.25px] font-normal text-primaryGrayscale">
                Join the Auto Verdure Movement to Transform Indoor & Outdoor
                Urban Plant Growing.
              </p>
              <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
                No Contaminants. Only Nutrient-Packed Produce.
              </p>
            </div>

            <div className="w-full h-[432px] xl:h-full flex gap-[21.5px] justify-between xl:justify-normal xl:gap-6">
              <Image
                className="xl:w-[192px] xl:h-[205px]"
                src="/aboutImg3.png"
                alt="img"
                width={172.075}
                height={183.725}
              />
              <Image
                className="xl:w-[192px] xl:h-[205px]"
                src="/aboutImg3.png"
                alt="img"
                width={171.075}
                height={183.725}
              />
            </div>
          </div>
        </div>

        {/* Join the Auto Verdure */}
        <div className="md:hidden mt-[114px] w-full flex flex-col gap-5">
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
          <div className="w-full h-[180.5px] rounded-[14.1px] bg-primaryMain"></div>

          <div className="w-full flex justify-between">
            <Image
              src="/aboutImg3.png"
              alt="img"
              width={171.765}
              height={183.395}
            />
            <Image
              src="/aboutImg3.png"
              alt="img"
              width={171.765}
              height={183.395}
            />
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <button className="text-base px-[42px] py-[18px] rounded-[100px] border-[1px] font-normal text-primaryGrayscale">
              About Us
            </button>
          </div>
        </div>

        {/* About Us Button */}
        <div className="mt-[58px] hidden w-full md:flex flex-col justify-center items-center">
          <button className="text-base px-[42px] py-[18px] rounded-[100px] border-[1px] font-normal text-primaryGrayscale">
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
