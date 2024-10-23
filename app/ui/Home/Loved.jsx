import Image from "next/image";
import React from "react";

const Loved = () => {
  return (
    <div className="mt-[53.6px] w-full p-3 rounded-[20px] flex flex-col justify-center items-center bg-[#F8F8F8]">
      <div className="w-full relative flex flex-col justify-center items-center">
        <Image
          className="object-contain"
          src="/loved1.png"
          alt="img"
          width={321.49}
          height={251.462}
        />
        <div className="absolute top-[19.098px] left-[18.098px] text-[10.345px] leading-[12.732px] tracking-[0.446px] px-[11.14px] py-[10.34px] rounded-[31.8px] uppercase text-[#5B5B5B] bg-[#FFFFFF]">
          <p>in Stock</p>
        </div>
      </div>

      <div className="mt-[31.83px] w-full flex flex-col gap-[11.14px]">
        <p className="text-[16.711px] leading-[20.053px] font-normal">
          Anthurium
        </p>
        <p className="text-[13.528px] leading-[23.873px] font-normal text-[#898989]">
          Imagine being transported to a tranquil garden oasis. The Anthurium,
          with its glossy heart-shaped
        </p>
        <div className="w-full flex justify-between items-center">
          <p className="text-[13.528px] leading-[15.915px] font-normal text-[#0E0E0E]">
            $349.99 USD
          </p>
          <button className="text-[15.915px] px-5 py-1 border-[#000] border-[0.8px] rounded-[46.2px]">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loved;
