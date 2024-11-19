import React, { useState } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import { Sliders, Grid, List } from "lucide-react";

const Store = ({ initialProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const handleFilterChange = (filters) => {
    let filtered = [...initialProducts];
    if (filters.type.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product && product.category && filters.type.includes(product.category)
      );
    }
    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredProducts].filter(Boolean);
    switch (sortType) {
      case "name-asc":
        sorted.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        sorted = [...initialProducts].filter(Boolean);
    }
    setFilteredProducts(sorted);
  };

  const handleShowCountChange = (count) => {
    setShowCount(Number(count));
  };

  const validProducts = filteredProducts.filter(
    (product) => product && product.productId && product.category
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-full sm:w-80 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StoreTools
          totalProducts={validProducts.length}
          displayedProducts={Math.min(showCount, validProducts.length)}
          onFilterChange={handleFilterChange}
          onSortChange={handleSort}
          onShowCountChange={handleShowCountChange}
          sortBy={sortBy}
          showCount={showCount}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </div>

      {/* Overlay when filter is open on mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isFilterOpen ? "sm:ml-80" : "ml-0"
        }`}
      >
        <TopSegment />

        {/* Controls Bar */}
        <div className="sticky top-0 z-20 bg-[white] border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Sliders className="w-4 h-4" />
                  Filters
                </button>
                <div className="hidden sm:flex items-center gap-2 border rounded-lg p-1 bg-gray-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="default">Sort by</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                <select
                  value={showCount}
                  onChange={(e) => handleShowCountChange(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value={16}>Show 16</option>
                  <option value={32}>Show 32</option>
                  <option value={64}>Show 64</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div
            className={`grid gap-6 sm:gap-8 ${
              viewMode === "grid"
                ? isFilterOpen
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {validProducts.slice(0, showCount).map((product, index) => (
              <Link
                key={product.productId || index}
                href={`/store/${product.category}/${product.productId}`}
                className="transform transition-transform hover:scale-[1.02]"
              >
                <ProductCard product={product} viewMode={viewMode} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const planters = (await findAllProducts("planters")) || [];
    const flowers = (await findAllProducts("flowers")) || [];
    const plants = (await findAllProducts("plants")) || [];
    const accessory = (await findAllProducts("accessory")) || [];

    const allProducts = [
      ...planters.map((p) => (p ? { ...p, category: "planters" } : null)),
      ...flowers.map((p) => (p ? { ...p, category: "flowers" } : null)),
      ...plants.map((p) => (p ? { ...p, category: "plants" } : null)),
      ...accessory.map((p) => (p ? { ...p, category: "accessory" } : null)),
    ].filter(Boolean);

    return {
      props: {
        initialProducts: allProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
}

export default Store;
