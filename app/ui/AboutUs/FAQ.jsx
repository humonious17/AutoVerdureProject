"use client";

import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import {
  generalQuestions,
  paymentQuestions,
  productQuestions,
} from "@/app/constant/data";

const FAQ = () => {
  const [faq, setFaq] = useState("general questions");

  const accordion = (faq) => {
    if (faq === "general questions") {
      return generalQuestions.map((item, index) => (
        <Accordion key={index} question={item.question} answer={item.answer} />
      ));
    } else if (faq === "product questions") {
      return productQuestions.map((item, index) => (
        <Accordion key={index} question={item.question} answer={item.answer} />
      ));
    } else if (faq === "payment questions") {
      return paymentQuestions.map((item, index) => (
        <Accordion key={index} question={item.question} answer={item.answer} />
      ));
    }
  };

  return (
    <div className="mt-[142px] md:mt-[198px] w-full flex flex-col justify-center items-center">
      {/* FAQ Title */}
      <div className="w-full flex flex-col md:gap-5 justify-center items-center">
        <p className="text-[40px] md:text-[50px] leading-[48px] md:leading-[60px] -tracking-[1px] md:-tracking-[1.25px] text-primaryGrayscale text-center font-normal">
          FAQ
        </p>
        <p className="md:w-[760px] text-sm leading-6 font-normal text-secondaryGrayscale text-center">
          We want to make sure you have all the information you need to make
          informed decisions about your plant purchases and care. Here are some
          common questions we receive from our customers:
        </p>
      </div>

      {/* FAQ Navbar */}
      <div className="mt-4 md:mt-8 text-center flex flex-col md:flex-row gap-4 md:gap-[38px] justify-center items-center">
        <div className="flex gap-[38px]">
          <div
            onClick={() => setFaq("general questions")}
            className={
              faq === "general questions"
                ? "px-[14px] py-[10px] md:px-8 md:py-4 text-base font-medium cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
                : "px-[14px] py-[10px] md:px-8 md:py-4 text-base font-medium text-secondaryGrayscale cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
            }
          >
            <p>General Questions</p>
          </div>
          <div
            onClick={() => setFaq("product questions")}
            className={
              faq === "product questions"
                ? "px-[14px] py-[10px] md:px-8 md:py-4 text-base font-medium cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
                : "px-[14px] py-[10px] md:px-8 md:py-4 text-base font-medium text-secondaryGrayscale cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
            }
          >
            <p>Product Questions</p>
          </div>
        </div>
        <div
          onClick={() => setFaq("payment questions")}
          className={
            faq === "payment questions"
              ? "px-[14px] py-[10px] md:px-8 md:py-4 text-base font-medium cursor-pointer text-primaryMain rounded-[100px] bg-transparent border-[1px] border-primaryMain"
              : "px-[14px] py-[10px] md:px-8 md:py-4 text-base font-medium text-secondaryGrayscale cursor-pointer hover:text-primaryMain rounded-[100px] bg-[#F5F5F5] border-[1px] hover:border-primaryMain"
          }
        >
          <p>Payment Questions</p>
        </div>
      </div>

      {/* FAQs */}
      {accordion(faq)}
    </div>
  );
};

export default FAQ;
