"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
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
}) => {
  const [filters, setFilters] = useState({
    type: [],
    pot: [],
    material: [],
    category: [], // New filter for plant categories
  });

  // Function to count active filters
  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
  };

  // Function to toggle filters
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

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({ type: [], pot: [], material: [], category: [] });
    onFilterChange({ type: [], pot: [], material: [], category: [] });
  };

  // Function to apply filters
  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="mt-8 w-full">
      <div className="w-full px-4 py-6 md:px-24 md:py-8 bg-gray-50 flex flex-col justify-center items-center">
        <div className="max-w-[355px] md:max-w-full w-full text-sm md:text-base flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[400px] sm:w-[540px] overflow-y-auto"
              >
                <SheetHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Filters</SheetTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      Clear all
                    </Button>
                  </div>
                  <Separator />
                </SheetHeader>

                <div className="py-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4"
                  >
                    {/* Product Type Filter */}
                    <AccordionItem value="type" className="border-none">
                      <AccordionTrigger className="text-base font-medium">
                        Product Type
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {["plants", "zenpot", "grobox", "accessory"].map(
                          (type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`type-${type}`}
                                checked={filters.type.includes(type)}
                                onChange={() => toggleFilter("type", type)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <label
                                htmlFor={`type-${type}`}
                                className="text-sm capitalize"
                              >
                                {type}
                              </label>
                            </div>
                          )
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Plant Category Filter */}
                    <AccordionItem value="category" className="border-none">
                      <AccordionTrigger className="text-base font-medium">
                        Plant Category
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {[
                          "Indoor Plants",
                          "Outdoor Plants",
                          "Seasonal Plants",
                        ].map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`category-${category}`}
                              checked={filters.category.includes(category)}
                              onChange={() =>
                                toggleFilter("category", category)
                              }
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Pot Type Filter */}
                    <AccordionItem value="pot" className="border-none">
                      <AccordionTrigger className="text-base font-medium">
                        Pot Type
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {["Hydroponics", "Traditional"].map((pot) => (
                          <div
                            key={pot}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`pot-${pot}`}
                              checked={filters.pot.includes(pot)}
                              onChange={() => toggleFilter("pot", pot)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <label htmlFor={`pot-${pot}`} className="text-sm">
                              {pot}
                            </label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Material Filter */}
                    <AccordionItem value="material" className="border-none">
                      <AccordionTrigger className="text-base font-medium">
                        Material
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {["FRP", "Ceramic"].map((material) => (
                          <div
                            key={material}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`material-${material}`}
                              checked={filters.material.includes(material)}
                              onChange={() =>
                                toggleFilter("material", material)
                              }
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <label
                              htmlFor={`material-${material}`}
                              className="text-sm"
                            >
                              {material}
                            </label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                  <Button onClick={applyFilters} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-4">
              <Image
                className="object-contain"
                src="/gridRound.svg"
                alt="gridRound"
                width={28}
                height={28}
              />
              <Image
                className="object-contain"
                src="/list.svg"
                alt="list"
                width={24}
                height={24}
              />
            </div>

            <Separator orientation="vertical" className="hidden md:block h-8" />

            <p className="hidden md:block text-sm text-gray-600">
              Showing {displayedProducts} of {totalProducts} results
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="hidden md:block py-2 px-3 text-sm border rounded-lg bg-white"
            >
              <option value="default">Sort by</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>

            <select
              value={showCount}
              onChange={(e) => onShowCountChange(e.target.value)}
              className="py-2 px-3 text-sm border rounded-lg bg-white"
            >
              <option value={16}>Show 16</option>
              <option value={32}>Show 32</option>
              <option value={64}>Show 64</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreTools;
