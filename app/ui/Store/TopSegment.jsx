import React from "react";
import StoreNavbar from "./StoreNavbar";

const TopSegment = () => {
  return (
    <div className="w-full bg-white">
      <div className="mt-[63px] max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Store
            </h1>
          </div>
        </div>
        <StoreNavbar />
      </div>
    </div>
  );
};

export default TopSegment;
