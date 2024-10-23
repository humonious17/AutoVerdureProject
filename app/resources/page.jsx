import React from "react";
import GuideCard from "../ui/GuideCard.jsx/GuideCard";
import { guides } from "../constant/data";
import Image from "next/image";
import ResourcesNavbar from "../ui/ResourcesNavbar";

const resources = () => {
  return (
    <div className="w-full px-4 md:px-[27px] xl:px-[119.99px] 2xl:px-[230px] bg-[#FFFCF8]">
      <ResourcesNavbar />

      <div className="pt-8 pb-[94px] md:pt-[70px] md:pb-[72px] xl:pt-16 xl:pb-[143px] md:px-[43px] xl:px-[1px] 2xl:px-[20px] w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-[33px]">
          <div className="w-full h-[226px] md:w-[337px] md:h-[351px] xl:w-[550px] xl:h-[343px] 2xl:w-[600px] rounded-3xl">
            <Image
              className="object-cover w-full h-[226px] md:w-[337px] md:h-[351px] xl:w-[550px] xl:h-[343px] 2xl:w-[600px] rounded-3xl"
              src={guides[0].blogImg}
              alt="blogImage"
              width={1000}
              height={226}
            />
          </div>

          <div className="w-full md:w-[350px] xl:w-[507px] 2xl:w-[550px]">
            <div className="w-fit rounded-lg px-3 py-[6px] text-sm font-normal -tracking-[0.35px] bg-quaternaryMain text-quaternaryBg">
              <p>Green Living</p>
            </div>
            <div className="mt-2 text-xl xl:text-2xl leading-6 -tracking-[0.5px] font-[600] text-primaryGrayscale">
              <p>{guides[0].title}</p>
              <p className="mt-2 text-sm font-normal leading-6 text-secondaryGrayscale">
                {guides[0].description}
              </p>
            </div>
            <div className="mt-3 text-base font-medium flex gap-2">
              <p>Read More</p>
              <Image
                src="/rightArrow.svg"
                alt="rightArrow"
                width={20}
                height={20}
              />
            </div>
            <div className="mt-3 flex gap-[12px]">
              <div>
                <Image
                  src={guides[0].authorImage}
                  alt="user"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex flex-col gap-[2px] text-start text-primaryGrayscale">
                <p className="text-xs font-medium">By {guides[0].authorName}</p>
                <p className="text-xs font-normal">{guides[0].createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Resources */}
        <div className="mt-[40px] md:mt-[58px] xl:mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[41px] sm:gap-y-[57px] xl:gap-y-[73px] sm:gap-x-[55px] xl:gap-x-[41px]">
          {guides
            .filter(
              (item) =>
                !item.title.includes(
                  "The Benefits of Indoor Plants for Your Health and Well-Being"
                )
            )
            .map((guide, index) => (
              <GuideCard href="/resources/123" guide={guide} key={index} />
            ))}
        </div>

        {/* Contact Us */}
        <div className="w-full mt-[107px] px-[23px] pt-[39px] pb-[20px] xl:px-[100px] xl:pt-[110px] xl:pb-[94px] rounded-[24px] bg-primaryCream md:flex flex-col justify-center items-center">
          <p className="mb-4 text-[32px] leading-[48px] -tracking-[0.8px] font-normal md:text-center">
            Book a call with an expert to guide you through auto farming For a
            desired healthier lifestyle
          </p>
          <p className="xl:w-[805px] text-sm leading-6 font-normal text-secondaryGrayscale xl:text-center">
            At Auto verdure, we know that selecting the right plants for your
            space can be a daunting task. That&apos;s why we offer personalized
            plant consultation services to help you make informed decisions
            about your indoor and outdoor greenery.
          </p>
          <div className="mt-6 w-fit px-[42px] py-[18px] rounded-[100px] text-base text-white bg-primaryMain font-normal cursor-pointer">
            <p>Contact us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default resources;
