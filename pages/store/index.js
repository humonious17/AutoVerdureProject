import React, { useState } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";
import Image from "next/image";

const Store = ({ initialProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);

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
    setShowCount(parseInt(count));
  };

  const validProducts = filteredProducts.filter(
    (product) => product && product.productId && product.category
  );

  return (
    <div className="w-full bg-[#FFFCF8] min-h-screen relative">
      {/* Filter Sidebar - Full screen on mobile */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white transform transition-transform duration-300 ease-in-out z-50 w-full sm:w-[300px] ${
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
                  className="flex items-center gap-2 xl:ml-8 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-lg border text-sm sm:text-base"
                >
                  <TuneIcon />
                  Filters
                </button>
                <div className="hidden sm:flex items-center gap-4">
                  <Image
                    className="object-contain cursor-pointer"
                    src="/gridRound.svg"
                    alt="gridRound"
                    width={28}
                    height={28}
                  />
                  <Image
                    className="object-contain cursor-pointer"
                    src="/list.svg"
                    alt="list"
                    width={24}
                    height={24}
                  />
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
                  className="py-1.5 px-2 sm:py-2 sm:px-3 text-sm border rounded-lg bg-white flex-1 sm:flex-none"
                >
                  <option value="default">Sort by</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                <select
                  value={showCount}
                  onChange={(e) => handleShowCountChange(e.target.value)}
                  className="py-1.5 px-2 sm:py-2 sm:px-3 text-sm border rounded-lg bg-white flex-1 sm:flex-none"
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
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Store;
