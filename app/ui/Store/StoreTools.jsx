"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const StoreTools = ({
    totalProducts,
    displayedProducts,
    onFilterChange,
    onSortChange,
    onShowCountChange,
    sortBy,
    showCount
}) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [filters, setFilters] = useState({ type: [], pot: [], material: [] });
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setOpenFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to toggle filters
    const toggleFilter = (category, value) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter(item => item !== value);
            } else {
                newFilters[category].push(value);
            }
            return newFilters;
        });
    };

    // Function to clear all filters
    const clearFilters = () => {
        setFilters({ type: [], pot: [], material: [] });
        onFilterChange({ type: [], pot: [], material: [] });
    };

    // Function to apply filters
    const applyFilters = () => {
        onFilterChange(filters);
        setOpenFilter(false);
    };

    return (
        <div className="mt-[42px] md:mt-10 w-screen">
            <div className="w-full px-[25px] py-[30px] md:px-[98px] md:py-[38px] bg-[#f4f4f4] flex flex-col justify-center items-center">
                <div className="max-w-[355px] md:max-w-full w-full text-xs md:text-xl flex justify-between">
                    <div className="w-fit flex items-center" ref={filterRef}>
                        {/* Filter Button */}
                        <div className="w-fit flex items-center">
                            <div>
                                <div
                                    onClick={() => setOpenFilter(!openFilter)}
                                    className="w-fit flex justify-center items-center cursor-pointer"
                                >
                                    <Image
                                        className="object-contain"
                                        src="/filter.svg"
                                        alt="filter"
                                        width={25}
                                        height={25}
                                    />
                                    <p className="ml-[9px] md:ml-3 font-normal">Filter</p>
                                </div>

                                {/* Filter Panel */}
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: openFilter ? 1 : 0, height: openFilter ? "auto" : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`w-[307px] sm:w-[462px] border-[1px] rounded-xl border-[#858585] bg-[#FFFFFF] absolute z-10 overflow-hidden ${
                                        openFilter ? "block" : "hidden"
                                    }`}
                                >
                                    {/* Filter Header */}
                                    <div className="w-full p-[16px] bg-[#f9f9f9] flex flex-col justify-center items-center rounded-t-lg">
                                        <p className="text-base text-[#000000] font-semibold">Filters</p>
                                        <button
                                            onClick={() => setOpenFilter(false)}
                                            className="absolute top-[10px] right-[10px] text-sm text-primaryMain"
                                        >
                                            ⨂
                                        </button>
                                        <button
                                            onClick={clearFilters}
                                            className="mt-[9px] w-[80%] py-1 text-sm font-medium text-[#A2A6B0] border rounded-full border-[#A2A6B0] hover:bg-[#f1f1f1] transition"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>

                                    {/* Filter Options */}
                                    <div className="w-full bg-white p-4 space-y-4">
                                        {/* Product Type Filter */}
                                        <div>
                                            <p className="text-sm font-semibold">Product Type</p>
                                            {['plants', 'zenpot', 'grobox'].map((type) => (
                                                <div key={type} className="flex justify-between items-center py-1">
                                                    <p className="capitalize">{type}</p>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.type.includes(type)}
                                                        onChange={() => toggleFilter("type", type)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pot Type Filter */}
                                        <div>
                                            <p className="text-sm font-semibold">Pot Type</p>
                                            {["Hydroponics", "Traditional"].map((pot) => (
                                                <div key={pot} className="flex justify-between items-center py-1">
                                                    <p>{pot}</p>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.pot.includes(pot)}
                                                        onChange={() => toggleFilter("pot", pot)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Material Filter */}
                                        <div>
                                            <p className="text-sm font-semibold">Material</p>
                                            {["FRP", "Ceramic"].map((material) => (
                                                <div key={material} className="flex justify-between items-center py-1">
                                                    <p>{material}</p>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.material.includes(material)}
                                                        onChange={() => toggleFilter("material", material)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={applyFilters}
                                            className="w-full py-2 mt-2 text-sm font-medium text-white bg-primaryMain rounded-full transition hover:bg-primaryHover"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* View Icons */}
                            <Image
                                className="object-contain hidden md:flex ml-[24px]"
                                src="/gridRound.svg"
                                alt="gridRound"
                                width={28}
                                height={28}
                            />
                            <Image
                                className="object-contain hidden md:flex ml-[24px]"
                                src="/list.svg"
                                alt="list"
                                width={24}
                                height={24}
                            />
                        </div>

                        <div className="hidden md:flex ml-[30px] mr-[34px] w-[2px] h-[37px] bg-[#9F9F9F]" />

                        {/* Products Count */}
                        <div className="w-fit hidden md:flex items-center">
                            <p className="ml-[9px] text-base font-normal">
                                Showing {displayedProducts} of {totalProducts} results
                            </p>
                        </div>
                    </div>

                    {/* Sort and Show Controls */}
                    <div className="w-fit flex items-center">
                        <div className="hidden md:flex">
                            <select
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="py-2 px-3 text-base border rounded-lg"
                            >
                                <option value="default">Sort by</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                            </select>
                        </div>

                        <div className="ml-[30px]">
                            <select
                                value={showCount}
                                onChange={(e) => onShowCountChange(e.target.value)}
                                className="py-2 px-3 text-base border rounded-lg"
                            >
                                <option value={16}>Show 16</option>
                                <option value={32}>Show 32</option>
                                <option value={64}>Show 64</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreTools;