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
      className="w-full h-auto md:w-full md:h-auto p-3 md:p-0 flex flex-col md:flex-row-reverse md:rounded-[32.1px] xl:rounded-[56px] md:overflow-hidden bg-[#faf0f8] border-[2.86px] border-[#fffbf7] hover:border-primaryMain rounded-[10px] drop-shadow-xl transition-all duration-500 ease-in-out"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="transition-all duration-500 ease-in-out transform"
        style={{
          height: isLargeScreen
            ? isHover
              ? `${214 + 28 + Math.ceil(description.length / 14) * 23}px`
              : "315px"
            : "170px",
        }}
      >
        {isVideo ? (
          <video
            className="object-cover rounded-[10px] md:rounded-none xl:rounded-none w-[203.231px] h-[170px] md:w-[203.231px] md:h-full xl:w-[355px] transition-transform duration-500 ease-in-out"
            src={video}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        ) : (
          <Image
            className="object-cover rounded-[10px] md:rounded-none xl:rounded-none w-[203.231px] h-[170px] md:w-[203.231px] md:h-full xl:w-[355px] transition-transform duration-500 ease-in-out"
            src={image}
            alt="media"
            width={203}
            height={463.75}
            unoptimized
            priority
          />
        )}
      </div>
      <div className="w-full md:w-[119px] xl:w-[202px] md:mx-[36.64px] xl:mx-16 xl:mt-[40px] flex flex-col transition-all duration-500 ease-in-out">
        <p className="mt-2 text-[13px] md:text-[21.754px] xl:text-[38px] leading-tight text-[#0E0E0E] font-normal transition-all duration-500 ease-in-out">
          {title}
        </p>

        <div
          className="transition-all duration-500 ease-in-out"
          style={{
            height: isLargeScreen
              ? isHover
                ? `${28 + Math.ceil(description.length / 14) * 23}px`
                : "90px"
              : isHover
              ? "auto"
              : "0px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: isHover ? "unset" : 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            opacity: isHover ? 1 : 0.8,
          }}
        >
          <p className="mt-1 text-[8px] md:text-[9.732px] xl:text-[17px] leading-tight text-[#5B5B5B] font-normal transition-all duration-500 ease-in-out">
            {description}
          </p>
        </div>

        <div
          className="transition-all duration-500 ease-in-out"
          style={{
            marginTop: isHover ? "8px" : "0",
            opacity: isHover ? 1 : 0.9,
          }}
        >
          <Link href={"/store/" + title.toLowerCase()}>
            <p className="flex items-center mt-1 md:mt-[30px] mb-1 md:mb-[60px] text-[8px] md:text-[9.732px] xl:text-[17px] leading-tight text-[#0E0E0E] font-medium hover:text-primaryMain transition-all duration-300 ease-in-out">
              Buy Now{" "}
              <span className="transition-transform duration-300 ease-in-out transform hover:translate-x-1">
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
    </div>
  );
};

export default CollectionCard;
