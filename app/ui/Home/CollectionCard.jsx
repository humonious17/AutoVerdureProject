import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const CollectionCard = ({ title, description, image, video }) => {
  const [isHover, setIsHover] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const isVideo = Boolean(video);

  useEffect(() => {
    // Check if the screen size is medium or larger
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-[171px] h-[285.68px] md:w-full md:h-auto p-3 md:p-0 flex flex-col md:flex-row-reverse md:rounded-[32.1px] xl:rounded-[56px] md:overflow-hidden bg-[#F8F8F8] border-[2.86px] border-[#FFFBF7] hover:border-primaryMain rounded-[10px]"
      onMouseEnter={() => isLargeScreen && setIsHover(true)}
      onMouseLeave={() => isLargeScreen && setIsHover(false)}
    >
      <div
        className="transition-all duration-400 ease-in-out"
        style={{
          height: isLargeScreen
            ? isHover
              ? `${214 + 28 + Math.ceil(description.length / 14) * 23}px` // Increased from 199 to 214 (+15px)
              : "290px" // Increased from 274 to 289 (+15px)
            : "190px", // Mobile height remains unchanged
        }}
      >
        {isVideo ? (
          <video
            className="object-cover w-[203.231px] h-[157px] md:w-[203.231px] md:h-full xl:w-[355px]"
            src={video}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        ) : (
          <Image
            className="object-cover w-[203.231px] h-[157px] md:w-[203.231px] md:h-full xl:w-[355px]"
            src={image}
            alt="media"
            width={203}
            height={463.75} // Updated to match new height
            unoptimized
            priority
          />
        )}
      </div>
      <div className="mt-2 md:mt-5 w-full md:w-[119px] xl:w-[202px] md:mx-[36.64px] xl:mx-16 xl:mt-[40px]">
        <p className="text-[13px] md:text-[21.754px] xl:text-[38px] leading-tight text-[#0E0E0E] font-normal">
          {title}
        </p>
        <div
          className="transition-all duration-400 ease-in-out"
          style={{
            height: isLargeScreen
              ? isHover
                ? `${28 + Math.ceil(description.length / 14) * 23}px`
                : "90px"
              : "70px", // Mobile height remains unchanged
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: isHover && isLargeScreen ? "unset" : 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <p className="mt-1 text-[8px] md:text-[9.732px] xl:text-[17px] leading-tight text-[#5B5B5B] font-normal transition-all duration-400 ease-in-out">
            {description}
          </p>
        </div>
        <Link href={"/store/" + title.toLowerCase()}>
          <p className="flex items-center mt-2 md:mt-[30px] mb-2 md:mb-[60px] text-[8px] md:text-[9.732px] xl:text-[17px] leading-tight text-[#0E0E0E] font-normal">
            Buy Now{" "}
            <span>
              <Image
                className="object-contain ml-2 w-[6px] h-[6px] md:w-[10.305px] md:h-[10.877px] xl:w-[18px] xl:h-[19px]"
                src="/buyNow.svg"
                alt="img"
                width={7.21}
                height={7.619}
              />
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
