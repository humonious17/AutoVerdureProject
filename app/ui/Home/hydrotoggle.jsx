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
        <div className="w-full xl:w-[320px] flex flex-col gap-4 text-sm md:text-xs xl:text-sm p-5 font-[600] rounded-[16.4px] bg-[#fff] shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
          <p className="font-[600] font-sfPro">How we are different.</p>
          <div className="w-full flex flex-col gap-3 text-[#666666]">
            {comparisonData.map((item, index) => (
              <p
                key={index}
                className="h-[30px] flex items-center font-sfPro hover:text-primaryMain transition-colors duration-200 hover:translate-x-1 transform transition-transform"
              >
                {item.label}
              </p>
            ))}
          </div>
        </div>

        {/* Second Column - Hydroponic Pot */}
        <div
          className={`w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-white 
    hover:shadow-2xl transition-all duration-300 
    ${activeView === "hydroponics" ? "flex" : "hidden md:flex"}
    whitespace-nowrap
    relative
    before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-white/10 before:opacity-0 hover:before:opacity-30 before:rounded-[16.4px] before:transition-opacity before:duration-300
    transform hover:scale-[1.02] hover:-translate-y-1
  `}
        >
          <p className="font-[600] text-center text-[#666] font-sfPro">
            Our Hydroponic Pot
          </p>
          <div className="mt-8 xl:mt-4 w-full flex flex-col gap-3">
            {comparisonData.map((item, index) => (
              <p
                key={index}
                className="h-[30px] flex items-center justify-center font-semibold text-center font-sfPro 
          hover:text-primaryMain transition-colors duration-200 
          hover:scale-105 transform transition-transform"
              >
                {item.hydroponic}
              </p>
            ))}
          </div>
        </div>

        {/* Third Column - Traditional Pots */}
        <div
          className={`w-[320px] text-sm md:text-xs xl:text-sm p-5 border-2 rounded-[16.4px] border-primaryMain flex flex-col bg-white 
    hover:shadow-2xl transition-all duration-300 
    ${activeView === "traditional" ? "flex" : "hidden md:flex"}
    relative
    before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-white/10 before:opacity-0 hover:before:opacity-30 before:rounded-[16.4px] before:transition-opacity before:duration-300
    transform hover:scale-[1.02] hover:-translate-y-1
  `}
        >
          <p className="font-[600] text-center text-[#666] font-sfPro">
            Traditional Pots
          </p>
          <div className="mt-8 xl:mt-4 w-full flex flex-col gap-3">
            {comparisonData.map((item, index) => (
              <p
                key={index}
                className="h-[30px] flex items-center justify-center font-semibold text-center font-sfPro 
          hover:text-primaryMain transition-colors duration-200 
          hover:scale-105 transform transition-transform"
              >
                {item.traditional}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="mt-6 w-full md:hidden bg-[#9A5CF51A] rounded-full p-2">
        <div className="flex justify-between items-center relative">
          <div
            className={`absolute h-full bg-primaryMain rounded-full transition-all duration-300 ease-in-out ${
              activeView === "hydroponics"
                ? "left-0 right-[50%]"
                : "left-[50%] right-0"
            }`}
          />
          <button
            onClick={() => setActiveView("hydroponics")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold font-sfPro whitespace-nowrap relative z-10 transition-colors duration-300 ${
              activeView === "hydroponics" ? "text-white" : "text-[#666]"
            }`}
          >
            Our Hydroponics Pot
          </button>
          <button
            onClick={() => setActiveView("traditional")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold font-sfPro whitespace-nowrap relative z-10 transition-colors duration-300 ${
              activeView === "traditional" ? "text-white" : "text-[#666]"
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
