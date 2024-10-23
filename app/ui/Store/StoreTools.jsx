"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion } from "framer-motion"; // Animation library
import axios from 'axios'; // Ensure axios is installed

const StoreTools = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [filters, setFilters] = useState({ type: [], pot: [], material: [] });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const filterRef = useRef(null); // Ref to handle clicks outside filter panel

  // Fetch product data from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust endpoint as necessary
        const productsArray = Object.values(response.data.products);
        setProductData(productsArray);
        setFilteredProducts(productsArray);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();

    // Add event listener for clicks outside the filter panel
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
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((item) => item !== value);
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  // Function to apply filters
  const applyFilters = () => {
    let filtered = productData;

    if (filters.type.length > 0) {
      filtered = filtered.filter((product) => filters.type.includes(product.productType));
    }

    if (filters.pot.length > 0) {
      filtered = filtered.filter((product) => filters.pot.includes(product.potType));
    }

    if (filters.material.length > 0) {
      filtered = filtered.filter((product) => filters.material.includes(product.material));
    }

    setFilteredProducts(filtered);
  };

  // Function to handle sorting
  const sortProducts = (sortCriteria) => {
    setSortBy(sortCriteria);
    let sorted = [...filteredProducts];

    if (sortCriteria === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(sorted);
  };

  // Function to handle "Show" dropdown
  const handleShowCount = (count) => {
    setShowCount(count);
  };

  return (
    <div className="mt-[42px] md:mt-10 w-screen">
      <div className="w-full px-[25px] py-[30px] md:px-[98px] md:py-[38px] bg-[#f4f4f4] flex flex-col justify-center items-center">
        <div className="max-w-[355px] md:max-w-full w-full text-xs md:text-xl flex justify-between">
          <div className="w-fit flex items-center" ref={filterRef}>
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

                {/* Animated filter panel */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: openFilter ? 1 : 0, height: openFilter ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`w-[307px] sm:w-[462px] border-[1px] rounded-xl border-[#858585] bg-[#FFFFFF] absolute z-10 overflow-hidden compact-filter ${
                    openFilter ? "block" : "hidden"
                  }`}
                >
                  <div className="w-full p-[16px] bg-[#f9f9f9] flex flex-col justify-center items-center rounded-t-lg">
                    <p className="text-base text-[#000000] font-semibold">Filters</p>

                    {/* Close button */}
                    <button
                      onClick={() => setOpenFilter(false)}
                      className="absolute top-[10px] right-[10px] text-sm text-primaryMain"
                    >
                      ⨂
                    </button>

                    <button
                      onClick={() => setFilters({ type: [], pot: [], material: [] })}
                      className="mt-[9px] w-[80%] py-1 text-sm font-medium text-[#A2A6B0] border rounded-full border-[#A2A6B0] hover:bg-[#f1f1f1] transition"
                    >
                      Clear Filters
                    </button>
                  </div>

                  <div className="w-full bg-white p-4 space-y-4">
                    {/* Plant Type Filter */}
                    <div>
                      <p className="text-sm font-semibold">Plant Type</p>
                      {["Indoor", "Outdoor", "Seasonal"].map((type) => (
                        <div key={type} className="flex justify-between items-center py-1">
                          <p>{type} Plants</p>
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

                    {/* Apply Filters Button */}
                    <button
                      onClick={applyFilters}
                      className="w-full py-2 mt-2 text-sm font-medium text-white bg-primaryMain rounded-full transition hover:bg-primaryHover"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </div>

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

            <div className="w-fit hidden md:flex items-center">
              <p className="ml-[9px] text-base font-normal">
                Showing {Math.min(showCount, filteredProducts.length)} of {filteredProducts.length} results
              </p>
            </div>
          </div>

          {/* Sort by */}
          <div className="w-fit flex items-center">
            <div className="hidden md:flex">
              <select
                value={sortBy}
                onChange={(e) => sortProducts(e.target.value)}
                className="py-2 text-base border rounded-lg"
              >
                <option value="default">Sort by</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Show dropdown */}
            <div className="ml-[30px]">
              <select
                value={showCount}
                onChange={(e) => handleShowCount(e.target.value)}
                className="py-2 text-base border rounded-lg"
              >
                <option value={16}>Show 16</option>
                <option value={32}>Show 32</option>
                <option value={64}>Show 64</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.slice(0, showCount).map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={250}
                height={250}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                <p className="mt-2 text-base font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreTools;
