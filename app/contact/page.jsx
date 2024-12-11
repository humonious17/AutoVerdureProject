"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    comments: "",
  });
  const [buttonText, setButtonText] = useState("Send Message");
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });
      if (response.ok) {
        setShowForm(false);
      } else {
        setButtonText("Send Message");
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setButtonText("Send Message");
      alert("An error occurred while sending the message");
    }
  };

  return (
    <div className="w-full px-4 pt-[80px] pb-[124px] md:px-[28px] md:py-[116px] xl:px-[119.99px] xl:pt-[114px] xl:pb-[151px] 2xl:px-[200px] 2xl:py-[116px] bg-[#FFFCF8] flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[219px] md:max-w-[382px] w-full relative  ">
        <div>
          <Image
            className="object-contain absolute -top-[10.5px] -left-[70px] md:top-6 md:-left-[120px] xl:-left-[247px] -rotate-45 md:rotate-45 transform scale-x-100 md:-scale-x-100"
            src="/leaf.png"
            alt="leaf"
            unoptimized={true}
            priority={true}
            width={58}
            height={41}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[40px]  md:text-[70px] leading-[48px] md:leading-[80px] -tracking-[1px] md:-tracking-[1.75px] font-normal text-primaryGrayscale">
            <p>Contact Us</p>
          </div>
          <div className="mt-3 md:mt-6 text-base font-medium">
            <p className="text-secondaryGrayscale ">
              <Link href="/">
                <span className="text-primaryMain">Home</span>
              </Link>{" "}
              / Contact Us
            </p>
          </div>
        </div>
        <div>
          <Image
            className="object-contain absolute top-[38.5px] -right-[70px] md:-top-[10px] md:-right-[118px] xl:top-[41.5px] xl:-right-[222px] rotate-45 md:-rotate-45"
            src="/leaf.png"
            alt="leaf"
            unoptimized={true}
            priority={true}
            width={58}
            height={41}
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="mt-[65px] md:mt-[72px] xl:mt-[72.5px] w-full border-[1px] border-black border-opacity-[11%]" />

      {/* Content */}
      <div className="mt-[23.5px] md:mt-[35px] w-full md:px-[32px] flex flex-col justify-center items-center">
        {/* Mail, Location, Phone */}
        <div className="max-w-[210px] md:max-w-[696px] w-full flex flex-col md:flex-row gap-y-[29px] md:gap-x-[80px] justify-center items-center">
          <div className="flex flex-col md:flex-row md:gap-[10px] justify-center items-center md:items-center">
            <div className="w-fit p-[8.06px] bg-[#F9ECDD] rounded-full">
              <Image
                src="/mail.svg"
                alt="mail"
                width={12.083}
                height={12.083}
              />
            </div>
            <Link
              className="mt-[10px] text-xs text-primaryGrayscale font-medium"
              href="mailto:support@autoverdure.com"
            >
              support@autoverdure.com
            </Link>
          </div>

          <div className="w-[190px] flex flex-col md:flex-row md:gap-[10px] justify-center items-center md:items-center">
            <div className="w-fit p-[8.06px] bg-[#F9ECDD] rounded-full">
              <Image
                src="/location.svg"
                alt="location"
                width={12.083}
                height={12.083}
              />
            </div>
            <p className="mt-[10px] text-xs text-center text-primaryGrayscale font-medium">
              XirdE 4F, 1797, Sector-52, Gurugram, Haryana- 122003
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:gap-[10px] justify-center items-center">
            <div className="w-fit p-[8.06px] bg-[#F9ECDD] rounded-full">
              <Image
                src="/telephone.svg"
                alt="telephone"
                width={12.083}
                height={12.083}
              />
            </div>
            <p className="mt-[10px] text-xs text-primaryGrayscale font-medium">
              +91 9220447170
            </p>
          </div>
        </div>

        {/* Contact Details */}
        {showForm ? (
          <div className="mt-[50.5px] max-w-[364px] md:max-w-[714px] xl:max-w-[778px] w-full flex flex-col justify-center items-center md:justify-normal md:items-start">
            <form
              className="w-full flex flex-col gap-y-[7px] justify-center items-center md:justify-normal md:items-start"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col gap-y-[7px] justify-center items-center md:justify-normal md:items-start">
                <p className="text-[40px] md:text-[50px] leading-[48px] -tracking-[1px] font-normal text-primaryGrayscale">
                  Our Contact Details
                </p>
                <p className="text-sm leading-6 text-center md:text-start font-normal text-secondaryGrayscale">
                  We&apos;d love to hear from you! Please fill out the form
                  below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <div className="mt-8 w-full flex flex-col gap-8">
                <div className="w-full flex flex-col md:flex-row gap-[18px]">
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-base font-medium">First Name</label>
                    <input
                      className={`text-base px-[21px] py-[18px] text-secondaryGrayscale border-[1px] focus:outline-none transition-colors duration-300 rounded-[100px] ${
                        formData.firstName ? "bg-purple-200" : "bg-white"
                      }`}
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-base font-medium">Last Name</label>
                    <input
                      className={`text-base px-[21px] py-[18px] text-secondaryGrayscale border-[1px] focus:outline-none transition-colors duration-300 rounded-[100px] ${
                        formData.lastName ? "bg-purple-200" : "bg-white"
                      }`}
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-[18px]">
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-base font-medium">
                      Email Address *
                    </label>
                    <input
                      className={`text-base px-[21px] py-[18px] text-secondaryGrayscale border-[1px] focus:outline-none transition-colors duration-300 rounded-[100px] ${
                        formData.email ? "bg-purple-200" : "bg-white"
                      }`}
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-base font-medium">
                      Type of Query
                    </label>
                    <input
                      className={`text-base px-[21px] py-[18px] text-secondaryGrayscale border-[1px] focus:outline-none transition-colors duration-300 rounded-[100px] ${
                        formData.queryType ? "bg-purple-200" : "bg-white"
                      }`}
                      type="text"
                      placeholder="Select Service"
                      name="queryType"
                      value={formData.queryType}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-[8px]">
                  <label className="text-base font-medium">
                    Comments / Questions
                  </label>
                  <textarea
                    rows={10}
                    className={`text-base px-[21px] py-[18px] rounded-xl text-secondaryGrayscale border-[1px] focus:outline-none transition-colors duration-300 ${
                      formData.comments ? "bg-purple-200" : "bg-white"
                    }`}
                    placeholder="Comments / Questions"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="mt-8 px-[42px] py-[18px] rounded-[100px] bg-primaryMain text-white ">
                {buttonText}
              </button>
            </form>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "100px", fontSize: "50px", marginTop: "50px" }}
          >
            <h1>Form submitted successfully</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
