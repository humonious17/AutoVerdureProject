import Image from "next/image";
import React from "react";

const Testimonial = () => {
  return (
    <div className="w-[280px] h-[387px] rounded-xl flex flex-col p-5 shadow-[0_24px_60px_0px_rgba(0,48,130,0.05)]">
      {/* Ratings and Post Date */}
      <div className="w-full flex justify-between items-center">
        {/* Ratings */}
        <div className="w-[106.66px]">
          <Image
            className="w-full object-contain"
            src="/stars5.svg"
            alt="stars"
            width={106.667}
            height={20}
          />
        </div>
        <div className="text-xs leading-[26px] font-normal text-[#000000]">
          <p>2 days ago</p>
        </div>
      </div>

      {/* Image */}
      <div className="mt-2 w-full">
        <Image
          className="w-full object-contain"
          src="/testimonial.png"
          alt="testimonial"
          width={240}
          height={188}
        />
      </div>

      {/* Testimonial Content */}
      <div className="w-full">
        <p className="mt-2 text-[18px] leading-[26px] font-[600] text-[#000000]">
          Best on the market
        </p>
        <p className="mt-2 text-sm leading-[22px] font-normal tex-[#000000]">
          I love this product because the support is great. Please ...
        </p>
      </div>

      {/* Horizontal line */}
      <div className="my-2 w-[60px] h-[1px] bg-[#C4C4C4]" />

      {/* Price */}
      <div className="text-sm leading-[22px] font-bold text-[#000000]">
        <p>Price</p>
      </div>
    </div>
  );
};

export default Testimonial;
