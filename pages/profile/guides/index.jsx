import React from "react";
import GuideCard from "@/app/ui/GuideCard.jsx/GuideCard";
import { guides } from "@/app/constant/data";

const Guides = () => {
  return (
    <div className="pt-20 pb-[132px] md:py-[102px] xl:pt-[90px] xl:pb-[70px] px-4 md:px-[70px] xl:px-[120px] 2xl:px-[250px] bg-[#FFFCF8] w-full flex flex-col justify-center items-center">
      {/* All Guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[41px] sm:gap-y-[57px] xl:gap-y-[73px] sm:gap-x-[55px] xl:gap-x-[41px]">
        {guides.map((guide, index) => (
          <GuideCard href="/profile/guides/123" guide={guide} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Guides;
