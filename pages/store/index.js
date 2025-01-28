import React, { useState } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";
import {
  LayoutGrid,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TikTokProductView from "./TikTokProductView";

const Store = ({ initialProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1); // Reset to first page when filters change
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
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleShowCountChange = (count) => {
    setShowCount(parseInt(count));
    setCurrentPage(1); // Reset to first page when show count changes
  };

  const validProducts = filteredProducts.filter(
    (product) => product && product.productId && product.category
  );

  // Calculate pagination values
  const totalPages = Math.ceil(validProducts.length / showCount);
  const startIndex = (currentPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentProducts = validProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, validProducts.length)} of{" "}
                  {validProducts.length} products
                </span>
              </div>

              {/* Sort and Show Count Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="py-1.5 px-2 sm:py-2 sm:px-3 text-sm border-2 rounded-lg bg-[#FFFBF7] flex-1 sm:flex-none focus:outline-none focus:border-purple-500 active:border-purple-600 hover:border-purple-600"
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
                  className="py-1.5 px-2 sm:py-2 sm:px-3 text-sm border-2 rounded-lg bg-[#FFFBF7] flex-1 sm:flex-none focus:outline-none focus:border-purple-500 active:border-purple-600 hover:border-purple-600"
                >
                  <option value={15}>Show 15</option>
                  <option value={30}>Show 30</option>
                  <option value={60}>Show 60</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="p-3 sm:p-8 flex flex-col items-center">
            <div
              className={`grid gap-4 sm:gap-12 w-full max-w-[1440px] ${
                isFilterOpen
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
              }`}
            >
              {currentProducts.map((product, index) => (
                <Link
                  key={product.productId || index}
                  href={`/store/${product.category}/${product.productId}`}
                  className="flex justify-center relative"
                  onMouseEnter={() => setHoveredProductId(product.productId)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <div
                    className={`w-full transition-all duration-300 ease-in-out rounded-[24px] sm:rounded-[44px] ${
                      hoveredProductId === product.productId
                        ? "scale-100 z-20 shadow-lg"
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

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8 mb-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-purple-600 hover:bg-purple-50"
                }`}
              >
                <ChevronLeft />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-purple-600 hover:bg-purple-50"
                }`}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        ) : (
          // TikTok Style View (mobile only)
          <div className="block sm:hidden">
            <TikTokProductView
              products={currentProducts}
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
