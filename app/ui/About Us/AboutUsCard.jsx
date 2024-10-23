import Image from "next/image";
import React from "react";

const AboutUsCard = ({ aboutDetails }) => {
  return (
    <div className="w-full md:w-[416px] px-[34.19px] py-[34.19px] gap-[10.68px] md:gap-[15px] flex flex-col bg-[#F9ECDD]">
      <div className="flex gap-[11.4px] items-center">
        <Image
          className="object-contain md:w-[48px] md:h-[49px]"
          src="star.svg"
          alt="star"
          width={34.186}
          height={34.898}
        />
        <p className="text-[25.64px] md:text-4xl leading-[30.767px] -tracking-[0.641px] md:leading-[43.2px] md:-tracking-[0.9px] text-black font-normal">
          {aboutDetails.title}
        </p>
      </div>

      <div className="text-[12.82px] md:text-[18px] fontText leading-[21.794px] md:leading-[30.6px] text-[#191919] font-normal">
        <p>{aboutDetails.description}</p>
      </div>
    </div>
  );
};

export default AboutUsCard;
