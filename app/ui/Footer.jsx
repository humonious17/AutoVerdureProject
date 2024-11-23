import Image from "next/image";
import React from "react";
import { quickLinks, support } from "../constant/data";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="pl-4 pr-[85px] md:px-[41px] lg:px-[80px] xl:px-[119px] pb-[45px] bg-[#FFFCF8] mt-[20px] ml-[20px]">
      {/* Border */}
      <div className="hidden md:flex mb-[73px] border-t-[1px] border-tertiaryBg" />
      <div className="xl:gap-x-[78px] grid grid-cols-1 md:grid-cols-2 xl:flex xl:justify-around">
        {/* Comapny Logo, About and Social Media */}
        <div className="w-full md:w-[292px] flex flex-col justify-start items-start gap-[33px]">
          <p className="text-black text-[28px] fontText font-medium leading-8">
            Auto Verdure
          </p>
          <p className="flex items-start text-sm font-normal leading-6 text-secondaryGrayscale">
            At Auto verdure, we are passionate about plants and bringing the
            beauty of nature into people&apos;s homes and workplaces.
          </p>

          <div className="flex justify-center items-center gap-[14px]">
            <div className="object-contain w-8 h-8">
              <Image src="/twitter.svg" alt="twitter" width={32} height={32} />
            </div>
            <div className="object-contain w-8 h-8">
              <Image src="/facebook.svg" alt="twitter" width={32} height={32} />
            </div>
            <div className="object-contain w-8 h-8">
              <Image
                src="/instagram.svg"
                alt="twitter"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>

        {/* Quick Links and Support */}
        <div className="mt-10 md:mt-0 flex gap-16">
          <div className="flex flex-col justify-start items-start">
            <p className="text-base font-medium text-secondaryMain">
              Quicklinks
            </p>
            <div className="mt-5 flex flex-col gap-6 justify-start items-start">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.url}>
                  <p className="text-xs font-medium">{link.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start items-start">
            <p className="text-base font-medium text-secondaryMain">Support</p>
            <div className="mt-5 flex flex-col gap-6 justify-start items-start">
              {support.map((link, index) => (
                <Link key={index} href={link.url}>
                  <p className="text-xs font-medium">{link.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Get In Touch */}
        <div className="w-[177px] mt-10 md:mt-[43px] xl:mt-0 flex flex-col gap-6 items-start">
          <p className="text-base font-medium text-secondaryMain">
            Get in touch
          </p>
          <div className="text-xs gap-6 font-medium flex flex-col justify-center items-start">
            <div className="flex justify-center items-start gap-[10px]">
              <div className="w-[55px] h-[29px] rounded-full flex justify-center items-center bg-tertiaryMain">
                <Image
                  src="/location.svg"
                  alt="location"
                  width={12.083}
                  height={12.083}
                />
              </div>
              <p className="flex items-start">
                4.F, 1797, Sector-52, Gurugram, Haryana- 122003
              </p>
            </div>

            <div className="flex justify-center items-center gap-[10px]">
              <div className="w-[29px] h-[29px] rounded-full flex justify-center items-center bg-tertiaryMain">
                <Image
                  src="/mail.svg"
                  alt="location"
                  width={12.083}
                  height={12.083}
                />
              </div>
              <Link
                href="mailto:Info@Autofarmstore.com"
                className="flex items-start"
              >
                Info@Autofarmstore.com
              </Link>
            </div>

            <div className="flex justify-center items-center gap-[10px]">
              <div className="w-[29px] h-[29px] rounded-full flex justify-center items-center bg-tertiaryMain">
                <Image
                  src="/telephone.svg"
                  alt="location"
                  width={12.083}
                  height={12.083}
                />
              </div>
              <p className="flex items-start">0124-4208370</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-[290px] xl:w-[287px] h-fit mt-[52px] md:mt-[43px] xl:mt-0 flex flex-col justify-center md:justify-normal items-center">
          <p
            className="text-base font-medium text-secondaryMain"
            style={{ color: "#6F6E73" }}
          >
            Newsletter
          </p>

          <div className="w-full mt-[18px] pl-[18px] pr-2 py-[7px] flex border-black border-opacity-[14%] rounded-[100px] border-[1px]">
            <form className="w-full flex justify-center items-center">
              <input
                autoComplete="false"
                className="w-full focus:outline-none bg-[#FFFCF8]"
                type="text"
                placeholder="Your Email"
                spellCheck="false"
              />
              <button
                className="px-6 py-3 rounded-[100px] text-white bg-primaryMain"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          <p className="mt-[28px] text-xs font-medium">
            © Copyright 2023, All Rights Reserved by Auto Verdure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
