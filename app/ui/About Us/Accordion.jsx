import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Accordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      onClick={handleOpen}
      className={
        !open
          ? "mt-[23px] max-w-[361px] md:max-w-[766px] w-full px-3 py-6 border-[1px] border-black border-opacity-[14%] rounded-xl flex flex-col gap-[15px] bg-[#FFFFFF] cursor-pointer ease-in-out duration-200"
          : "mt-[23px] max-w-[361px] md:max-w-[766px] w-full px-3 py-6 border-[1px] border-black border-opacity-[14%] rounded-xl flex flex-col gap-[15px] bg-[#DBC5FC] cursor-pointer ease-in-out duration-200"
      }
    >
      {/* Questions */}
      <div className="w-full text-base md:text-xl leading-[19.2px] md:leading-6 -tracking-[0.4px] md:-tracking-[0.5px] font-bold text-primaryGrayscale flex gap-[11px] items-start">
        <p className="max-w-[307px] md:max-w-[766px] md:w-full">{question}</p>
        {open ? (
          <FaPlus className="cursor-pointer" />
        ) : (
          <FaMinus className="cursor-pointer" />
        )}
      </div>

      {/* Answers */}
      {open && (
        <div className="w-full text-sm leading-6 font-normal text-secondaryGrayscale ease-in-out duration-200">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
