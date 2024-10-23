import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="px-4 sm:px-[70px] md:px-[118px] lg:px-[185px] xl:px-[285px] 2xl:px-[500px] w-full bg-[#FFFCF8] flex flex-col justify-center items-center">
      <div className="mt-[93px] xl:mt-[74px] px-5 py-10 md:px-[20%] md:py-[108px] xl:py-[108px] w-full bg-white border-[1px] border-[#E0E0E0] flex flex-col justify-center items-center">
        <div className="w-full flex gap-[10px]">
          <div className="pl-3 pr-3 py-[10px] w-full rounded-md border-[2px] hover:border-[#0570DE] border-[#E0E0E0] cursor-pointer shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]">
            <Image
              className="object-contain md:w-4 md:h-4"
              src="/card.svg"
              alt="card"
              width={16}
              height={16}
            />
            <p className="text-[13px] font-[600] text-[#0570DE]">Card</p>
          </div>
          <div className="pl-3 pr-3 py-[10px] w-full rounded-md border-[2px] hover:border-[#0570DE] border-[#E0E0E0] cursor-pointer shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]">
            <Image
              className="object-contain md:w-[51px] md:h-[18px]"
              src="/upi.png"
              alt="upi"
              width={40}
              height={30}
            />
            <p className="text-[13px] font-[600] text-[#0570DE]">UPI</p>
          </div>
          <div className="pl-3 pr-3 py-[10px] w-full rounded-md border-[2px] hover:border-[#0570DE] border-[#E0E0E0] cursor-pointer shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]">
            <Image
              className="object-contain md:w-6 md:h-6"
              src="/wallet.png"
              alt="wallet"
              width={16}
              height={16}
            />
            <p className="text-[13px] font-[600] text-[#0570DE]">Wallets</p>
          </div>
          <div className="px-3 w-[40px] rounded-md border-[2px] hover:border-[#0570DE] border-[#E0E0E0] cursor-pointer shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]">
            ...
          </div>
        </div>

        <form className="mt-2 w-full flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="text-[13px] font-[600] text-[#4F5B76]">
              Card Number
            </label>
            <div className="w-full flex pl-2 py-1 md:pl-3 md:py-[10px] border-[2px] border-[#E0E0E0] rounded-md shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]">
              <input
                className="w-full text-[13px] focus:outline-none"
                type="number"
                placeholder="1234 1234 1234 1234"
              />
              <div className="hidden md:flex gap-[4.25px] pr-2 md:pr-3 justify-center items-center">
                <Image src="/visa.svg" alt="visa" width={23.5} height={15.5} />
                <Image
                  src="/master.svg"
                  alt="master"
                  width={23.5}
                  height={15.5}
                />
                <Image
                  src="/americanexp.svg"
                  alt="americanexp"
                  width={23.5}
                  height={15.5}
                />
                <Image
                  src="/discover.svg"
                  alt="discover"
                  width={23.5}
                  height={15.5}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[13px] font-[600] text-[#4F5B76]">
              Expiry
            </label>
            <input
              className="w-full text-[13px] px-2 py-1 md:px-3 md:py-[10px] focus:outline-none border-[2px] border-[#E0E0E0] rounded-md shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]"
              type="number"
              placeholder="MM / YY"
            />
          </div>
          <div className="flex w-full gap-2">
            <div className="flex flex-col w-full">
              <label className="text-[13px] font-[600] text-[#4F5B76]">
                Country
              </label>
              {/* <input
                className="w-full text-[13px] px-2 py-1 md:px-3 md:py-[10px] border-[2px] border-[#E0E0E0] rounded-md shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]"
                type="number"
                placeholder="1234 1234 1234 1234"
              /> */}
              <select className="w-full h-full text-[13px] px-2 py-1 md:px-3 md:py-[10px] bg-white border-[2px] border-[#E0E0E0] rounded-md focus:outline-none shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]">
                <option selected>India</option>
                <option>Russia</option>
                <option>USA</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-[13px] font-[600] text-[#4F5B76]">
                Postal code
              </label>
              <input
                className="w-full text-[13px] px-2 py-1 md:px-3 md:py-[10px] focus:outline-none border-[2px] border-[#E0E0E0] rounded-md shadow-[0_2px_4px_0px_rgba(0,0,0,0.07)]"
                type="number"
                placeholder="90210"
              />
            </div>
          </div>
        </form>
      </div>

      <button className="my-[93px] px-[42px] py-[18px] text-base font-medium bg-primaryMain text-white rounded-[100px]">
        Add your card
      </button>
    </div>
  );
};

export default page;
