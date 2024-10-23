"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CheckoutNavbar = () => {
  const pathname = usePathname().split("/").pop();
  console.log(pathname);
  return (
    <div className="mt-[70px] sm:mt-[155px] xl:mt-[105px] w-full flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[219px] sm:max-w-[382px] w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[40px] sm:text-[70px] leading-[48px] sm:leading-[80px] -tracking-[1px] sm:-tracking-[1.75px] font-normal text-primaryGrayscale">
            <p>Checkout</p>
          </div>
          <div className="mt-3 sm:mt-6 text-base font-medium">
            <p className="text-secondaryGrayscale">
              <Link href="/">
                <span className="text-primaryMain">Home</span>
              </Link>{" "}
              / Checkout
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="my-[58px] sm:mt-[43px] sm:mb-[111px] xl:mt-[73px] xl:mb-[80px] max-w-[600px] w-full px-6 sm:px-0 flex gap-x-1 justify-center items-center">
        <div className="w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-primaryMain border-primaryMain text-[#F7FAFC] flex justify-center items-center">
          1
        </div>
        <div className="w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-primaryMain" />
        <div
          className={
            pathname === "shipping"
              ? "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-primaryMain border-primaryMain text-[#F7FAFC] flex justify-center items-center"
              : "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-transparent border-[#CCCCCC] text-[#1A202C] flex justify-center items-center"
          }
        >
          2
        </div>
        <div
          className={
            pathname === "shipping"
              ? "w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-primaryMain"
              : "w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-[#CCCCCC]"
          }
        />
        <div
          className={
            pathname === "payment"
              ? "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-primaryMain border-primaryMain text-[#F7FAFC] flex justify-center items-center"
              : "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-transparent border-[#CCCCCC] text-[#1A202C] flex justify-center items-center"
          }
        >
          3
        </div>
        <div
          className={
            pathname === "payment"
              ? "w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-primaryMain"
              : "w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-[#CCCCCC]"
          }
        />
        <div
          className={
            pathname === "successful"
              ? "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-primaryMain border-primaryMain text-[#F7FAFC] flex justify-center items-center"
              : "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-transparent border-[#CCCCCC] text-[#1A202C] flex justify-center items-center"
          }
        >
          4
        </div>
      </div>
    </div>
  );
};

export default CheckoutNavbar;
