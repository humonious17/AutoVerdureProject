import Image from "next/image";
import React from "react";

const Testimonial = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-5 md:gap-x-[18px] xl:gap-x-[120px] justify-center items-center md:justify-normal md:items-start xl:items-center md:p-6 md:rounded-[20px] md:border-[1px] border-[#D8D8D8]">
      <div className="w-full xl:w-fit flex flex-col md:flex-1 xl:flex-none gap-5">
        <Image
          className="object-contain rounded-[56px]"
          src="/testimonial1.png"
          alt="img"
          width={349}
          height={301}
        />

        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <p className="text-2xl leading-[28.0px] -tracking-[0.6px] font-[600] text-primaryGrayscale">
            Jane Doe
          </p>
          <p className="text-sm leading-6 font-normal text-secondaryGrayscale">
            Plant Specialist
          </p>
        </div>
      </div>

      <div className="w-full px-3 py-6 md:p-0 rounded-[20px] border-[1px] md:border-none border-[#D8D8D8] flex md:flex-1 flex-col gap-5">
        <Image src="/quote.svg" alt="img" width={64} height={64} />

        <p className="max-w-[322px] md:w-full xl:max-w-[548px] text-[20px] xl:text-2xl leading-[30px] xl:leading-[48px] -tracking-[0.5px] xl:-tracking-[0.6px] font-medium text-primaryGrayscale">
          I love working at Auto verdure because I get to share my passion for
          plants with customers every day. It&apos;s so rewarding to see their
          faces light up when they find the perfect plant for their home or
          office.
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
