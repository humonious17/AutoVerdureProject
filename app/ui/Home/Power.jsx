"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const ContentSections = () => {
  const [visibleSectionRow1, setVisibleSectionRow1] = useState(0);
  const [visibleSectionRow2, setVisibleSectionRow2] = useState(0);

  // Touch event tracking with improved precision
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;
  const maxSwipeTime = 300; // milliseconds

  const handleSwipe = useCallback((row, direction) => {
    const updateSection =
      row === 1 ? setVisibleSectionRow1 : setVisibleSectionRow2;

    updateSection((prev) => {
      if (direction === "next") {
        return (prev + 1) % 2;
      } else {
        return (prev - 1 + 2) % 2;
      }
    });
  }, []);

  const onTouchStart = useCallback((e) => {
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      time: Date.now(),
    };
    touchEndRef.current = null;
    setIsDragging(true);
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      touchEndRef.current = {
        x: e.targetTouches[0].clientX,
        time: Date.now(),
      };
    },
    [isDragging]
  );

  const onTouchEnd = useCallback(
    (row) => {
      if (!touchStartRef.current || !touchEndRef.current) {
        setIsDragging(false);
        return;
      }

      const { x: startX, time: startTime } = touchStartRef.current;
      const { x: endX, time: endTime } = touchEndRef.current;

      const distance = startX - endX;
      const timeDiff = endTime - startTime;

      // Check if swipe is valid (within time and distance thresholds)
      const isValidSwipe =
        Math.abs(distance) > minSwipeDistance && timeDiff < maxSwipeTime;

      if (isValidSwipe) {
        const direction = distance > 0 ? "next" : "prev";
        handleSwipe(row, direction);
      }

      // Reset dragging state
      setIsDragging(false);
      touchStartRef.current = null;
      touchEndRef.current = null;
    },
    [handleSwipe]
  );

  // Auto-advance sections every 10 seconds
  useEffect(() => {
    const interval1 = setInterval(() => {
      setVisibleSectionRow1((prevSection) => (prevSection + 1) % 2);
    }, 10000);

    const interval2 = setInterval(() => {
      setVisibleSectionRow2((prevSection) => (prevSection + 1) % 2);
    }, 10000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const sections = [
    {
      id: 0,
      video: "/pdr.mp4",
      title: "Powerful Design Research",
      description:
        "We are the first in the Indian Market to combat the rising concern of mosquito-induced diseases by integrating the solution into our design research.",
      playsInline: true,
      autoPlay: true,
      muted: true,
      loop: true,
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
      playsInline: true,
      autoPlay: true,
      muted: true,
      loop: true,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center">
      {/* First Row (Mobile View Only) */}
      <div
        className="block md:hidden w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd(1)}
      >
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
                    style={{
                      width: "100%",
                      height: "300px",
                      transition: "opacity 0.3s ease-in-out",
                    }}
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
                    style={{
                      width: "100%",
                      height: "auto",
                      transition: "opacity 0.3s ease-in-out",
                    }}
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
        {/* Progress Dots for First Row */}
        <div className="flex justify-center mt-4 space-x-2">
          {[0, 1].map((dot) => (
            <span
              key={dot}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                dot === visibleSectionRow1 ? "bg-primaryMain" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Second Row (Mobile View Only) */}
      <div
        className="block md:hidden w-full mt-[59px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd(2)}
      >
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
                    style={{
                      width: "100%",
                      height: "auto",
                      transition: "opacity 0.3s ease-in-out",
                    }}
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
                    style={{
                      width: "100%",
                      height: "300px",
                      transition: "opacity 0.3s ease-in-out",
                    }}
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
        {/* Progress Dots for Second Row */}
        <div className="flex justify-center mt-4 space-x-2">
          {[0, 1].map((dot) => (
            <span
              key={dot}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                dot === visibleSectionRow2 ? "bg-primaryMain" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSections;
