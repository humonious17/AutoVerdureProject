"use client";
import Image from "next/image";
import React from "react";
import { quickLinks, support } from "../constant/data";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      setIsSuccess(true);
      setMessage(data.message);
      setEmail("");

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      setMessage(error.message || "An error occurred");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pl-4 pr-[85px] md:px-[41px] lg:px-[80px] xl:px-[119px] pb-[45px] bg-[#FFFBF7] mt-[20px] ml-[20px]">
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
                XirdE, 4.F, 1797, Sector-52, Gurugram, Haryana- 122003
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
                href="mailto:support@Autofarmstore.com"
                className="flex items-start"
              >
                support@autoverdure.com
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

        {/* Newsletter section with enhanced animations */}
        <div className="w-full md:w-[290px] xl:w-[287px] h-fit mt-[52px] md:mt-[43px] xl:mt-0 flex flex-col justify-center md:justify-normal items-center">
          <p className="text-base font-medium text-secondaryMain relative group cursor-default">
            Newsletter
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryMain transition-all group-hover:w-full"></span>
          </p>

          <form onSubmit={handleSubmit} className="w-full mt-[18px]">
            <div
              className={`w-full pl-[18px] pr-2 py-[7px] flex border-black border-opacity-[14%] rounded-[100px] border-[1px] transition-all duration-300 ease-in-out ${
                isLoading ? "opacity-70" : ""
              } ${
                isSuccess ? "border-green-500 border-opacity-100" : ""
              } hover:border-primaryMain hover:border-opacity-50 focus-within:border-primaryMain focus-within:border-opacity-100 focus-within:shadow-lg focus-within:shadow-primaryMain/20`}
            >
              <input
                required
                type="email"
                className="w-full focus:outline-none bg-[#FFFBF7] transition-all duration-300"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`relative px-6 py-3 rounded-[100px] text-white overflow-hidden transition-all duration-300 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primaryMain hover:shadow-lg hover:shadow-primaryMain/50 active:scale-95"
                }`}
              >
                <span
                  className={`inline-flex items-center transition-all duration-300 ${
                    isLoading ? "opacity-0" : ""
                  }`}
                >
                  {isSuccess ? (
                    <span className="flex items-center gap-2">
                      Done
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  ) : (
                    "Submit"
                  )}
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`mt-[28px] text-xs font-medium transition-all duration-300 transform ${
                message
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <p
                className={`px-4 py-2 rounded-full ${
                  isSuccess
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </p>
            </div>
          )}
          <p className="mt-[28px] text-xs font-medium">
            © Copyright 2024, All Rights Reserved by Auto Verdure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
