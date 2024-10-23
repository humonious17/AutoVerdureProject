import React from "react";
import GuideCard from "../ui/GuideCard.jsx/GuideCard";
import { guides } from "../constant/data";

const Guides = () => {
  return (
    <div className="pt-20 pb-[132px] md:py-[102px] xl:pt-[90px] xl:pb-[70px] pl-4 pr-[13px] bg-[#FFFCF8] w-full flex flex-col justify-center items-center">
      {/* All Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[41px] md:gap-y-[57px] xl:gap-y-[73px] md:gap-x-[55px] xl:gap-x-[41px]">
        {guides.map((guide, index) => (
          <GuideCard href="/guides" guide={guide} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Guides;
