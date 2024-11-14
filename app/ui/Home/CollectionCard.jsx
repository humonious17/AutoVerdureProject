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
      className="w-full p-3 md:p-0 flex flex-col md:flex-row-reverse md:rounded-[32.1px] xl:rounded-[56px] md:overflow-hidden bg-[#F8F8F8] border-[2.86px] hover:border-primaryMain"
      onMouseEnter={() => isLargeScreen && setIsHover(true)}
      onMouseLeave={() => isLargeScreen && setIsHover(false)}
    >
      <div
        className="transition-all duration-400 ease-in-out"
        style={{
          height: isHover
            ? `${199 + 28 + Math.ceil(description.length / 14) * 23}px`
            : "274px",
        }}
      >
        {isVideo ? (
          <video
            className="object-cover w-[203.231px] h-[180px] md:w-[203.231px] md:h-full xl:w-[355px]"
            src={video}
            autoPlay
            loop
            muted
          ></video>
        ) : (
          <Image
            className="object-cover w-[203.231px] h-[180px] md:w-[203.231px] md:h-full xl:w-[355px]"
            src={image}
            alt="media"
            width={203}
            height={274}
            unoptimized
            priority
          />
        )}
      </div>
      <div className="mt-5 w-full md:w-[119px] xl:w-[202px] md:mx-[36.64px] xl:mx-16 xl:mt-[40px]">
        <p className="text-[15.237px] md:text-[21.754px] xl:text-[38px] leading-tight text-[#0E0E0E] font-normal sm:mt-[6px] md:-mt-[2px]">
          {title}
        </p>
        <div
          className="transition-all duration-400 ease-in-out"
          style={{
            height: isHover
              ? `${28 + Math.ceil(description.length / 14) * 23}px`
              : "75px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: isHover ? "unset" : 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <p className="mt-1 sm:mt-[6px] md:mt-[15.47px] xl:mt-[20.8px] text-[9.732px] xl:text-[17px] leading-tight text-[#5B5B5B] font-normal transition-all duration-400 ease-in-out">
            {description}
          </p>
        </div>
        <Link href={"/store/" + title.toLowerCase()}>
          <p className="flex items-center mt-4 md:mt-[30px] mb-8 md:mb-[60px] text-[9.732px] xl:text-[17px] leading-tight text-[#0E0E0E] font-normal border-b md:border-b-[1px] border-[#BBBBBB]">
            Buy Now{" "}
            <span>
              <Image
                className="object-contain ml-2 md:w-[10.305px] md:h-[10.877px] xl:w-[18px] xl:h-[19px]"
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
