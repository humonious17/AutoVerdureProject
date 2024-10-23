import React from "react";
import StoreNavbar from "./StoreNavbar";
import StoreTools from "./StoreTools";

const TopSegment = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#FFFCF8] overflow-hidden">
      <div className="mt-[63px] w-full flex flex-col justify-center items-center md:justify-start md:items-start">
        <p className="px-6 sm:px-[44px] xl:px-[64px] w-full text-[38px] leading-[52px] font-normal text-[#0E0E0E]">
          Store
        </p>
        <StoreNavbar />
        <StoreTools />
      </div>
    </div>
  );
};

export default TopSegment;
