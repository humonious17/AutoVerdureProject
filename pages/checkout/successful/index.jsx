import Image from "next/image";
import React from "react";

const Successful = () => {
  return (
    <div className="mb-[95px] sm:mb-[58px] xl:mb-[105px] w-full px-11 sm:px-5 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[560px] w-full flex flex-col gap-y-3 sm:text-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Thank you for your purchase!
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Content */}
      <div className="mt-5 sm:mt-[69px] max-w-[724px] w-full flex flex-col sm:flex-row sm:gap-x-6">
        <div className="w-full h-[350px] sm:w-[350px]">
          <Image
            className="w-full h-full object-contain"
            src="/orderconfirmed.png"
            alt="Order Confirmed"
            width={350}
            height={350}
          />
        </div>

        <div className="mt-[47px] sm:mt-0 w-full px-6 py-7 rounded-2xl flex flex-col gap-y-[57px] bg-[#FFFFFF]">
          <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
            Hurray! Your order is confirmed.
          </p>
          <p className="text-sm leading-[26.2px] font-normal text-[#8C8C8C]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="w-full py-[17px] text-base leading-[20.8px] font-bold rounded-[30px] bg-[#070707] text-white flex justify-center items-center">
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Successful;
