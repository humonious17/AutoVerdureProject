import React, { useState, useEffect } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";
import Image from "next/image";

const Flowers = (props) => {
  const flowers = props.products || [];
  const [filteredProducts, setFilteredProducts] = useState(flowers);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [displayedProductsCount, setDisplayedProductsCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setDisplayedProductsCount(Math.min(showCount, filteredProducts.length));
  }, [filteredProducts, showCount]);

  const handleFilterChange = (filters) => {
    let filtered = [...flowers];

    if (filters.type.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product && product.category && filters.type.includes(product.category)
      );
    }

    if (filters.pot.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product && product.potType && filters.pot.includes(product.potType)
      );
    }

    if (filters.material.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product &&
          product.material &&
          filters.material.includes(product.material)
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
      case "price-asc":
        sorted.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        sorted = [...flowers].filter(Boolean);
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
    <div className="w-full bg-[#FFFCF8] min-h-screen">
      {/* Sidebar Filter */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white transform transition-transform duration-300 ease-in-out z-50 w-full sm:w-[300px] ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StoreTools
          totalProducts={flowers.length}
          displayedProducts={displayedProductsCount}
          onFilterChange={handleFilterChange}
          onSortChange={handleSort}
          onShowCountChange={handleShowCountChange}
          sortBy={sortBy}
          showCount={showCount}
          setIsFilterOpen={setIsFilterOpen}
        />
      </div>

      {/* Overlay for Filter Close */}
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

        {/* Sorting and Filtering Section */}
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
                {/* Grid and List View Icons */}
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
        <div className="mt-10 mb-20 w-full flex flex-col justify-center items-center">
          <div className="max-w-[1440px] w-full grid grid-cols-2 xl:grid-cols-3 gap-12">
            {filteredProducts.map((product, index) => (
              <Link key={index} href={`/store/flowers/${product.productId}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await findAllProducts("flowers");
  if (!products) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      products: products,
    },
  };
}

export default Flowers;
