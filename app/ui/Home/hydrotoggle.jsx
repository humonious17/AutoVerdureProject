import React, { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

const HydroponicComparison = () => {
  const [activeView, setActiveView] = useState("hydroponics");

  return (
    <div className="mt-[30px] md:mt-[73px] xl:mt-[82px] w-full flex flex-col justify-center items-center">
      <div className="w-full md:w-[523px] xl:w-fit flex flex-row md:flex-row md:gap-x-5 rounded-[16.4px] space-y-0">
        {/* First Column */}
        <div className="w-full xl:w-[320px] flex flex-col gap-4 text-sm md:text-xs xl:text-sm p-5 font-[600] rounded-[16.4px] shadow-[0_16.412px_49.235px_-2.051px_rgba(0,0,0,0.05)] bg-[#fff]">
          <p className="font-[600]">How we are different.</p>
          <div className="w-full flex flex-col gap-3 text-[#666666]">
            <p>Plant Watering</p>
            <p>Minimal Water Wastage</p>
            <p>Rate of Produce Growth</p>
            <p>Labour Required</p>
            <p>No Pest-induced diseases</p>
            <p>Reduced Carbon Footprint</p>
            <p>Higher Crop Yield</p>
          </div>
        </div>

        {/* Second Column - Hydroponic Pot */}
        <div
          className={`w-full xl:w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-white shadow-[0_16.412px_49.235px_-2.051px_rgba(0,0,0,0.05)] ${
            activeView === "hydroponics" || "hidden md:flex"
          }`}
        >
          <p className="font-[600] text-center text-[#666]">
            Our Hydroponic Pot
          </p>
          <div className="mt-4 w-full flex flex-col gap-3 items-center">
            <p className="font-semibold">Once 30-45 Days</p>
            <BiCheck className="text-[#00FF66] text-xl" />
            <p className="font-semibold">Faster</p>
            <p className="font-semibold">Less</p>
            <div className="flex flex-col gap-3 items-center">
              {[1, 2, 3].map((_, i) => (
                <BiCheck key={i} className="text-[#00FF66] text-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Third Column - Traditional Pots */}
        <div
          className={`w-full xl:w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-white shadow-[0_16.412px_49.235px_-2.051px_rgba(0,0,0,0.05)] ${
            activeView === "traditional" ? "flex" : "hidden md:flex"
          }`}
        >
          <p className="font-[600] text-center text-[#666]">Traditional Pots</p>
          <div className="mt-4 flex flex-col gap-3 items-center">
            <p className="font-semibold">Almost Everyday</p>
            <p className="font-semibold text-center">Overwatering & Underwatering</p>
            <p className="font-semibold">Slower</p>
            <p className="font-semibold">More</p>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((_, i) => (
                <BiX key={i} className="text-[#FF0000] text-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="mt-6 w-full md:hidden bg-[#9A5CF51A] rounded-full p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveView("hydroponics")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold ${
              activeView === "hydroponics"
                ? "bg-primaryMain text-white"
                : "text-[#666]"
            }`}
          >
            Our Hydroponics Pot
          </button>
          <button
            onClick={() => setActiveView("traditional")}
            className={`flex-1 py-5 px-4 rounded-full text-sm font-semibold ${
              activeView === "traditional"
                ? "bg-primaryMain text-white"
                : "text-[#666]"
            }`}
          >
            Traditional Pots
          </button>
        </div>
      </div>
    </div>
  );
};

export default HydroponicComparison;
