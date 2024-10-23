import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CollectionCard = ({ title, description, image }) => {
  const [lineClamp, setLineClamp] = useState(2);
  const [isHover, setIsHover] = useState(false)
  return (
    <div className="w-fit h-fit md:h-fit p-3 md:p-0 md:flex flex-row-reverse rounded-xl md:rounded-[32.1px] xl:rounded-[56px] md:overflow-hidden bg-[#F8F8F8] border-[2.86px] hover:border-[2.86px] hover:border-primaryMain" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
       <div className="transition-all duration-400 ease-in-out" style={{height: (isHover ? `${199 + 28 + (Math.ceil(description.length / 14) * 23)}px` : '274px')}}> 
        <Image
          className="object-cover md:w-[203.231px] md:h-full xl:w-[355px]"
          src={image}
          alt="img"
          width={147.347}
          height={157.183}
          unoptimized={true}
          priority
        />
      </div>
      <div className="mt-[16.94px] w-[119px] xl:w-[202px] md:mx-[36.64px] xl:mx-16 xl:mt-[40px]">
        <p className="text-[15.237px] md:text-[21.754px] xl:text-[38px] leading-[19.888px] md:leading-[28.281px] xl:leading-[49.4px] text-[#0E0E0E] font-normal">
          {title}
        </p>
        <div className="transition-all duration-400 ease-in-out" style={{height: (isHover ? `${28 + (Math.ceil(description.length / 14) * 23)}px` : '75px'), display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: (isHover ? 'unset' : 2), overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <p className="mt-[8.12px] md:mt-[9.47px] xl:mt-[16.8px] mb-2 md:mb-[5.57px] xl:mb-[10px] text-[8px] md:text-[9.732px] xl:text-[17px] leading-[12.029px] md:leading-[17.174px] xl:leading-[30px] text-[#5B5B5B] font-normal transition-all duration-400 ease-in-out">
            {description}
          </p>
        </div>
        <Link href={'/store/' + title.toLowerCase()} >
          <p className="flex items-center md:pb-[5px] md:border-b-[1px] md:border-[#BBBBBB] text-[6.817px] md:text-[9.732px] xl:text-[17px] leading-[0.02px] md:leading-[11.45px] xl:leading-5 text-[#0E0E0E] font-normal" style={{marginTop: '20px', marginBottom: '60px'}}>
            Buy Now{" "}
            <span>
              <Image
                className="object-contain ml-[2px] md:w-[10.305px] md:h-[10.877px] xl:w-[18px] xl:h-[19px]"
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
