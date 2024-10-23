import Input from "@/app/ui/Input";
import Link from "next/link";
import React from "react";
import { BsApple, BsGoogle } from "react-icons/bs";

const Signup = () => {
  return (
    <div className="mb-[95px] sm:mb-[58px] xl:mb-[105px] w-full px-11 sm:px-0 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[560px] w-full flex flex-col gap-y-3">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Create An Account
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
          Join to start shopping and stay up-to-date on the latest deals.
        </p>
      </div>

      {/* Google and Apple Authentication */}
      <div className="mt-[42px] sm:mt-[52px] max-w-[560px] w-full flex flex-col sm:flex-row gap-y-4 sm:gap-x-4">
        <button className="w-full flex gap-2 justify-center items-center py-[14px] sm:py-[17px] rounded-[60px] border-[1px] border-[#070707] bg-[#FFFFFF] text-[#070707] hover:bg-[#070707] hover:text-white ease-in-out duration-200">
          <BsApple />
          <p>Continue with Apple</p>
        </button>
        <button className="w-full flex gap-2 justify-center items-center py-[14px] sm:py-[17px] rounded-[60px] border-[1px] border-[#070707] bg-[#FFFFFF] text-[#070707] hover:bg-[#070707] hover:text-white ease-in-out duration-200">
          <BsGoogle />
          <p>Continue with Google</p>
        </button>
      </div>

      {/* Or */}
      <div className="my-8 max-w-[560px] w-full flex gap-x-2 items-center">
        <div className="w-full h-[1px] bg-[#E4E4E4]" />
        <p className="text-base leading-[25.6px] font-medium text-[#070707]">
          or
        </p>
        <div className="w-full h-[1px] bg-[#E4E4E4]" />
      </div>

      {/* Form */}
      <div className="max-w-[560px] w-full">
        <form className="w-full flex flex-col gap-y-6">
          <div className="w-full flex flex-col sm:flex-row gap-x-4 gap-y-6 sm:gap-y-0">
            <Input label="First Name" placeholder="Type here" type="text" />
            <Input label="Last Name" placeholder="Type here" type="text" />
          </div>
          <Input label="Email" placeholder="Type here" type="email" />
          <Input label="Phone" placeholder="Type here" type="tel" />
          <Input label="Password" placeholder="Type here" type="password" />

          <button
            type="submit"
            className="mt-[42px] sm:mt-[52px] w-full text-base px-6 py-[17px] rounded-[30px] border-[1px] bg-[#070707] border-[#070707] text-[#FFFFFF] font-[600]"
          >
            Create Account
          </button>

          <p className="mt-4 sm:mt-6 text-sm leading-[18.2px] text-[#8E8F94] font-medium text-center">
            Already Created?
            <Link href="/cart/checkout/signin">
              <span className="text-[#070707]"> Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
