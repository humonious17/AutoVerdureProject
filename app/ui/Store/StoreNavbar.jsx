"use client";

import { storeNavItems } from "@/app/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StoreNavbar = () => {
  let pathname = usePathname().split("/").pop();

  if (pathname === "store") {
    pathname = "all";
  }

  return (
    <div className="mt-[31px] px-6 sm:px-[44px] xl:px-[64px] md:mt-10 w-full h-full flex gap-4 flex-wrap justify-start">
      {storeNavItems.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className={`
            // Mobile: Items should be aligned horizontally and fill the row
            sm:w-auto sm:text-[14px] sm:px-8 sm:py-4 sm:leading-5 sm:gap-8
            // Desktop: Items should be left aligned with normal padding
            md:w-auto md:text-[17px] md:px-4 md:py-3 md:leading-6
            border-[1px] 
            rounded-[33px] 
            border-[#D1D1D1] 
            hover:bg-[#0E0E0E] 
            hover:border-[#0E0E0E] 
            hover:text-[#fff] 
            font-medium 
            capitalize 
            flex justify-center items-center
            // Active link styles
            ${pathname === item.title ? "bg-[#0E0E0E] text-[#fff] border-[#0E0E0E]" : "text-[#0E0E0E]"}
            // Adjust gap
            sm:gap-8 md:gap-6 xl:gap-10
          `}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default StoreNavbar;
