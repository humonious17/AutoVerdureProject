"use client";

import Image from "next/image";
import React, { useState } from "react";

const Input = ({ label, type, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="w-full flex flex-col gap-y-3">
      <label className="text-2xl leading-6 capitalize font-normal text-[#070707]">
        {label}
      </label>
      <div className="w-full text-base px-4 py-3 leading-[25.6px] rounded-[84px] border-[1px] border-[#070707] text-[#070707] bg-[#FFFFFF] font-medium flex gap-5 justify-between">
        <input
          className="w-full h-fit text-base focus:outline-none"
          placeholder={placeholder}
          type={isVisible ? "text" : type}
        />
        {type === "password" && (
          <Image
            className="cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
            src="/eye.svg"
            alt="eye"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
