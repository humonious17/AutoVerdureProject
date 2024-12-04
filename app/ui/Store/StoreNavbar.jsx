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
    <nav className="w-full bg-[#FFFBF7] shadow-sm">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto hide-scrollbar py-4">
            <div className="inline-flex gap-3 px-4 sm:px-6 min-w-full">
              {storeNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className={`
                    whitespace-nowrap
                    px-4 py-2
                    text-sm font-medium
                    rounded-full
                    transition-all
                    duration-300
                    ease-in-out
                    transform
                    hover:scale-105
                    hover:shadow-md
                    border-2
                    ${
                      pathname === item.title.toLowerCase()
                        ? "bg-primaryMain text-white border-primaryMain scale-105 shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex mt-[31px] px-6 sm:px-[44px] xl:px-[64px] md:mt-10 w-full h-full gap-4 flex-wrap py-2">
        {storeNavItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={`
              w-fit 
              text-[10px] 
              md:text-[17px] 
              leading-5 
              px-3 
              py-2 
              md:px-6 
              md:py-3 
              border-[1px] 
              rounded-[33px] 
              font-medium 
              capitalize 
              flex 
              justify-center 
              items-center
              transition-all
              duration-300
              ease-in-out
              transform
              hover:scale-105
              hover:shadow-md
              ${
                pathname === item.title.toLowerCase()
                  ? "border-primaryMain bg-primaryMain text-[#fff] scale-105 shadow-md"
                  : "border-[#D1D1D1] text-[#0E0E0E] hover:bg-primaryMain hover:border-primaryMain hover:text-[#fff]"
              }
            `}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default StoreNavbar;
