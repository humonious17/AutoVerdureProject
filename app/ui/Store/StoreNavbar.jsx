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
    <div className="mt-[31px] px-6 sm:px-[44px] xl:px-[64px] md:mt-10 w-full h-full flex gap-4 flex-wrap">
      {storeNavItems.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className={
            pathname === item.title
              ? "w-fit text-[10px] md:text-[17px] leading-5 px-3 py-2 md:px-6 md:py-3 border-[1px] rounded-[33px] border-[#0E0E0E] bg-[#0E0E0E] text-[#fff] font-medium capitalize flex justify-center items-center"
              : "w-fit text-[10px] md:text-[17px] leading-5 px-3 py-2 md:px-6 md:py-3 border-[1px] rounded-[33px] border-[#D1D1D1] hover:bg-[#0E0E0E] hover:border-[#0E0E0E] hover:text-[#fff] font-medium capitalize flex justify-center items-center"
          }
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default StoreNavbar;
