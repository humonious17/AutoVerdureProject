"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CheckoutNavbar = () => {
  const pathname = usePathname().split("/").pop();

  // Helper function to determine if a step should be active
  const isStepActive = (step) => {
    const steps = {
      guest: 1,
      member: 1,
      shipping: 2,
      payment: 3,
      successful: 4,
    };

    const currentStepNumber = steps[pathname] || 1;
    return steps[step] <= currentStepNumber;
  };

  // Helper function to get step styles
  const getStepStyles = (stepNumber) => {
    if (stepNumber === 1) {
      return "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-primaryMain border-primaryMain text-[#F7FAFC] flex justify-center items-center";
    }

    const isActive = isStepActive(
      {
        2: "shipping",
        3: "payment",
        4: "successful",
      }[stepNumber]
    );

    return isActive
      ? "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-primaryMain border-primaryMain text-[#F7FAFC] flex justify-center items-center"
      : "w-12 h-12 text-xl leading-8 border-2 rounded-full font-[600] bg-transparent border-[#CCCCCC] text-[#1A202C] flex justify-center items-center transition-colors duration-300";
  };

  // Helper function to get connector styles
  const getConnectorStyles = (stepNumber) => {
    const isActive = isStepActive(
      {
        1: "shipping",
        2: "payment",
        3: "successful",
      }[stepNumber]
    );

    return isActive
      ? "w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-primaryMain transition-colors duration-300"
      : "w-[43px] sm:w-[128px] h-[2px] rounded-lg bg-[#CCCCCC] transition-colors duration-300";
  };

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
                <span className="text-primaryMain hover:underline transition-colors">
                  Home
                </span>
              </Link>{" "}
              / Checkout
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="my-[58px] sm:mt-[43px] sm:mb-[111px] xl:mt-[73px] xl:mb-[80px] max-w-[600px] w-full px-6 sm:px-0 flex gap-x-1 justify-center items-center">
        {/* Step 1 */}
        <div className={getStepStyles(1)}>
          <span className="transform transition-transform duration-300 scale-100">
            1
          </span>
        </div>

        {/* Connector 1 */}
        <div className={getConnectorStyles(1)} />

        {/* Step 2 */}
        <div className={getStepStyles(2)}>
          <span className="transform transition-transform duration-300 scale-100">
            2
          </span>
        </div>

        {/* Connector 2 */}
        <div className={getConnectorStyles(2)} />

        {/* Step 3 */}
        <div className={getStepStyles(3)}>
          <span className="transform transition-transform duration-300 scale-100">
            3
          </span>
        </div>

        {/* Connector 3 */}
        <div className={getConnectorStyles(3)} />

        {/* Step 4 */}
        <div className={getStepStyles(4)}>
          <span className="transform transition-transform duration-300 scale-100">
            4
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutNavbar;
