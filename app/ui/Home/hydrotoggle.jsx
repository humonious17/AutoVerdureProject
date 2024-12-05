import React, { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

const HydroponicComparison = () => {
  const [activeView, setActiveView] = useState("hydroponics");

  const comparisonData = [
    {
      label: "Plant Watering",
      hydroponic: "Once 30-45 Days",
      traditional: "Almost Everyday",
    },
    {
      label: "Minimal Water Wastage",
      hydroponic: <BiCheck className="text-[#00FF66] mx-auto text-xl" />,
      traditional: "Overwatering & Underwatering",
    },
    {
      label: "Rate of Produce Growth",
      hydroponic: "Faster",
      traditional: "Slower",
    },
    {
      label: "Labour Required",
      hydroponic: "Less",
      traditional: "More",
    },
    {
      label: "No Pest-induced diseases",
      hydroponic: <BiCheck className="text-[#00FF66] mx-auto text-xl" />,
      traditional: <BiX className="text-[#FF0000] mx-auto text-xl" />,
    },
    {
      label: "Reduced Carbon Footprint",
      hydroponic: <BiCheck className="text-[#00FF66] mx-auto text-xl" />,
      traditional: <BiX className="text-[#FF0000] mx-auto text-xl" />,
    },
    {
      label: "Higher Crop Yield",
      hydroponic: <BiCheck className="text-[#00FF66] mx-auto text-xl" />,
      traditional: <BiX className="text-[#FF0000] mx-auto text-xl" />,
    },
  ];

  return (
    <div className="mt-[30px] md:mt-[73px] xl:mt-[82px] w-full flex flex-col justify-center items-center">
      <div className="w-full md:w-[523px] xl:w-fit flex flex-row md:flex-row md:gap-x-5 rounded-[16.4px] space-y-0">
        {/* First Column - Labels */}
        <div className="w-full xl:w-[320px] flex flex-col gap-4 text-sm md:text-xs xl:text-sm p-5 font-[600] rounded-[16.4px] drop-shadow-xl bg-[#fff]">
          <p className="font-[600]">How we are different.</p>
          <div className="w-full flex flex-col gap-3 text-[#666666]">
            {comparisonData.map((item, index) => (
              <p key={index} className="h-[30px] flex items-center">
                {item.label}
              </p>
            ))}
          </div>
        </div>

        {/* Second Column - Hydroponic Pot */}
        <div
          className={`w-full xl:w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-white drop-shadow-xl ${
            activeView === "hydroponics" || "hidden md:flex"
          }`}
        >
          <p className="font-[600] text-center text-[#666]">
            Our Hydroponic Pot
          </p>
          <div className="mt-8  xl:mt-4 w-full flex flex-col gap-3">
            {comparisonData.map((item, index) => (
              <p
                key={index}
                className="h-[30px] flex items-center justify-center font-semibold text-center"
              >
                {item.hydroponic}
              </p>
            ))}
          </div>
        </div>

        {/* Third Column - Traditional Pots */}
        <div
          className={`w-full xl:w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-white drop-shadow-xl ${
            activeView === "traditional" ? "flex" : "hidden md:flex"
          }`}
        >
          <p className="font-[600] text-center text-[#666]">Traditional Pots</p>
          <div className="mt-8 xl:mt-4 flex flex-col gap-3">
            {comparisonData.map((item, index) => (
              <p
                key={index}
                className="h-[30px] flex items-center justify-center font-semibold text-center"
              >
                {item.traditional}
              </p>
            ))}
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
            className={`flex-1 py-[17px] px-4 rounded-full text-sm font-semibold ${
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
