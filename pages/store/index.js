import React, { useState } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";
import { LayoutGrid, Smartphone } from "lucide-react";
import TikTokProductView from "./TikTokProductView";

const Store = ({ initialProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
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
      case "price-low":
        sorted.sort(
          (a, b) =>
            (parseFloat(a.productPrice) || 0) -
            (parseFloat(b.productPrice) || 0)
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) =>
            (parseFloat(b.productPrice) || 0) -
            (parseFloat(a.productPrice) || 0)
        );
        break;
      default:
        sorted = [...initialProducts].filter(Boolean);
    }

    setFilteredProducts(sorted);
  };

  const handleShowCountChange = (count) => {
    setShowCount(parseInt(count));
  };

  const validProducts = filteredProducts.filter(
    (product) => product && product.productId && product.category
  );

  return (
    <div className="w-full bg-[#FFFBF7] min-h-screen relative">
      {/* Filter Sidebar - Full screen on mobile */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#FFFBF7] transform transition-transform duration-300 ease-in-out z-50 w-full sm:w-[300px] ${
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

      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
        />
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out relative z-10 ${
          isFilterOpen ? "sm:ml-[300px]" : "ml-0"
        }`}
      >
        <TopSegment />

        {/* Header with Controls */}
        <div className="w-full bg-[#9A5CF50F] mt-5">
          <div className="px-3 py-4 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
              {/* Filter Toggle and View Options */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 xl:ml-8 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFFBF7] rounded-lg border text-sm sm:text-base"
                >
                  <TuneIcon />
                  Filters
                </button>

                {/* View Mode Toggles */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600"
                    }`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("tiktok")}
                    className={`p-2 rounded-lg sm:hidden transition-colors ${
                      viewMode === "tiktok"
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600"
                    }`}
                    aria-label="TikTok Style View"
                  >
                    <Smartphone className="w-5 h-5" />
                  </button>
                </div>

                <span className="text-sm text-gray-600">
                  Showing {validProducts.slice(0, showCount).length} of{" "}
                  {validProducts.length} products
                </span>
              </div>

              {/* Sort and Show Count Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="py-1.5 px-2 sm:py-2 sm:px-3 text-sm border-2 rounded-lg bg-[#FFFBF7] flex-1 sm:flex-none  focus:outline-none focus:border-purple-500 active:border-purple-600 hover:border-purple-600"
                >
                  <option value="default">Sort by</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
                <select
                  value={showCount}
                  onChange={(e) => handleShowCountChange(e.target.value)}
                  className="py-1.5 px-2 sm:py-2 sm:px-3 text-sm border-2 rounded-lg bg-[#FFFBF7] flex-1 sm:flex-none  focus:outline-none focus:border-purple-500 active:border-purple-600 hover:border-purple-600"
                >
                  <option value={16}>Show 16</option>
                  <option value={32}>Show 32</option>
                  <option value={64}>Show 64</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="p-3 sm:p-8 flex justify-center">
            <div
              className={`grid gap-4 sm:gap-12 w-full max-w-[1440px] ${
                isFilterOpen
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
              }`}
            >
              {validProducts.slice(0, showCount).map((product, index) => (
                <Link
                  key={product.productId || index}
                  href={`/store/${product.category}/${product.productId}`}
                  className="flex justify-center relative"
                  onMouseEnter={() => setHoveredProductId(product.productId)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <div
                    className={`w-full transition-all duration-300 ease-in-out ${
                      hoveredProductId === product.productId
                        ? "scale-105 z-20 shadow-xl"
                        : "scale-100 z-10"
                    }`}
                  >
                    <ProductCard
                      product={product}
                      isExpanded={hoveredProductId === product.productId}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // TikTok Style View (mobile only)
          <div className="block sm:hidden">
            <TikTokProductView
              products={validProducts.slice(0, showCount)}
              onClose={() => setViewMode("grid")}
            />
          </div>
        )}
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
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Store;
