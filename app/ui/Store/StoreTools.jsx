"use client";

import Image from "next/image";
import React, { useState } from "react";
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
  const [filters, setFilters] = useState({
    type: [],
    pot: [],
    material: [],
    category: [],
  });

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
    setFilters({ type: [], pot: [], material: [], category: [] });
    onFilterChange({ type: [], pot: [], material: [], category: [] });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Clear all
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full" // Added margin-left to shift the button to the right
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
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

      <div className="p-4 border-t">
        <button
          onClick={applyFilters}
          className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
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
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm capitalize">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default StoreTools;
