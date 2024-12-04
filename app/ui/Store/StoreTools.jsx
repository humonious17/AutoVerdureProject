"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";

const StoreTools = ({
  totalProducts,
  displayedProducts,
  onFilterChange,
  onSortChange,
  onShowCountChange,
  sortBy,
  showCount,
  isFilterOpen,
  setIsFilterOpen,
}) => {
  // Initialize filters state
  const [filters, setFilters] = useState({
    type: [],
    pot: [],
    material: [],
    category: [],
  });

  // Add sorting options state
  const [selectedSort, setSelectedSort] = useState(sortBy || "newest");
  const [selectedCount, setSelectedCount] = useState(showCount || 12);

  // Handle filter changes
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      pot: [],
      material: [],
      category: [],
    });
    onFilterChange({
      type: [],
      pot: [],
      material: [],
      category: [],
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  // Handle sort and show count changes
  const handleSortChange = (value) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  const handleShowCountChange = (value) => {
    setSelectedCount(value);
    onShowCountChange(value);
  };

  return (
    <div className="h-full flex flex-col bg-[#FFFBF7] shadow-lg rounded-lg">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters & Sort</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Clear all
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Sort Options */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Sort Options */}
          <div className="space-y-3">
            <h3 className="font-medium">Sort By</h3>
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <Separator />

          {/* Show Count Options */}
          <div className="space-y-3">
            <h3 className="font-medium">Show per page</h3>
            <select
              value={selectedCount}
              onChange={(e) => handleShowCountChange(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
              <option value={48}>48</option>
            </select>
          </div>

          <Separator />

          {/* Filter Sections */}
          <FilterSection
            title="Product Type"
            options={["plants", "planters", "flowers", "accessory"]}
            selected={filters.type}
            onToggle={(value) => toggleFilter("type", value)}
          />

          <Separator />

          <FilterSection
            title="Plant Category"
            options={["Indoor Plants", "Outdoor Plants", "Seasonal Plants"]}
            selected={filters.category}
            onToggle={(value) => toggleFilter("category", value)}
          />

          <Separator />

          <FilterSection
            title="Pot Type"
            options={["Hydroponics", "Traditional"]}
            selected={filters.pot}
            onToggle={(value) => toggleFilter("pot", value)}
          />

          <Separator />

          <FilterSection
            title="Material"
            options={["FRP", "Ceramic"]}
            selected={filters.material}
            onToggle={(value) => toggleFilter("material", value)}
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="p-4 border-t border-b">
        <p className="text-sm text-gray-600">
          Showing {displayedProducts} of {totalProducts} products
        </p>
      </div>

      {/* Apply Button */}
      <div className="p-4">
        <button
          onClick={applyFilters}
          className="w-full mb-16 xl:mb-0 py-2 px-4 bg-primaryMain text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options, selected, onToggle }) => (
  <div className="space-y-3">
    <h3 className="font-medium">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
            className="h-4 w-4 rounded border-gray-300 accent-primaryMain"
          />
          <span className="text-sm capitalize">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default StoreTools;
