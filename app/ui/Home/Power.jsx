"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ContentSections = () => {
  const [visibleSectionRow1, setVisibleSectionRow1] = useState(0); // For first row
  const [visibleSectionRow2, setVisibleSectionRow2] = useState(0); // For second row

  useEffect(() => {
    const interval1 = setInterval(() => {
      setVisibleSectionRow1((prevSection) => (prevSection + 1) % 2); // Cycle through 2 sections in row 1
    }, 10000); // Change section every 10 seconds in row 1

    const interval2 = setInterval(() => {
      setVisibleSectionRow2((prevSection) => (prevSection + 1) % 2); // Cycle through 2 sections in row 2
    }, 10000); // Change section every 10 seconds in row 2

    return () => {
      clearInterval(interval1); // Cleanup interval for row 1
      clearInterval(interval2); // Cleanup interval for row 2
    };
  }, []);

  const sections = [
    {
      id: 0,
      image: "/imag.jpg",
      title: "Powerful Design Research",
      description:
        "We are the first in the Indian Market to combat the rising concern of mosquito-induced diseases by integrating the solution into our design research.",
    },
    {
      id: 1,
      image: "/water.jpg",
      title: "Water Retention",
      description:
        "We have successfully developed an unmatchable Water Retention Technology amongst all the Hydroponic system competitors.",
    },
    {
      id: 2,
      image: "/RJP00792.JPG",
      title: "Aesthetic Appeal",
      description:
        "Elevate your home or office with our diverse selection of indoor plants. From graceful succulents to verdant ferns, our self-watering pots add a touch of natural beauty to your surroundings, enhancing your space with an eye-catching allure.",
    },
    {
      id: 3,
      video: "/expert.mp4",
      title: "Expert Guidance",
      description:
        "And YES, Just Like you, we are Passionate about Plants- We Bring you Expert Guidance to provide proper care to your Plants.",

    },
  ];

  return (
    <div className="w-full flex flex-col justify-center">
      {/* First Row (Mobile View Only) */}
      <div className="block md:hidden w-full">
        {sections.slice(0, 2).map((section, index) => (
          <div
            key={section.id}
            className="flex flex-col justify-center items-center w-full"
          >
            {index === visibleSectionRow1 && (
              <>
                {section.image ? (
                  <Image
                    className="rounded-[16px]"
                    src={section.image}
                    alt={section.title}
                    width={646.67}
                    height={300}
                    style={{ width: "100%", height: "300px" }}
                  />
                ) : (
                  <video
                    className="object-cover rounded-[16px]"
                    src={section.video}
                    alt={section.title}
                    playsInline
                    loop
                    autoPlay
                    muted
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <div className="mt-[30px] w-full px-4">
                  <p className="text-2xl leading-[48px] -tracking-[0.6px] text-primaryMain font-bold">
                    {section.title}
                  </p>
                  <p className="mt-[10px] text-xl leading-8 -tracking-[0.5px] font-normal text-secondryGrayscale">
                    {section.description}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Second Row (Mobile View Only) */}
      <div className="block md:hidden w-full mt-[59px]">
        {sections.slice(2).map((section, index) => (
          <div
            key={section.id}
            className="flex flex-col justify-center items-center w-full"
          >
            {index === visibleSectionRow2 && (
              <>
                {section.image ? (
                  <Image
                    className="rounded-[16px]"
                    src={section.image}
                    alt={section.title}
                    width={646.67}
                    height={300}
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  <video
                    className="object-cover rounded-[16px]"
                    src={section.video}
                    alt={section.title}
                    playsInline
                    loop
                    autoPlay
                    muted
                    width={646.67}
                    height={300}
                    style={{ width: "100%", height: "300px" }}
                  />
                )}
                <div className="mt-[30px] w-full px-4">
                  <p className="text-2xl leading-[48px] -tracking-[0.6px] text-primaryMain font-bold">
                    {section.title}
                  </p>
                  <p className="mt-[10px] text-xl leading-8 -tracking-[0.5px] font-normal text-secondryGrayscale">
                    {section.description}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSections;
