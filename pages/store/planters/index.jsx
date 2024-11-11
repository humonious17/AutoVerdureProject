import React, { useState, useEffect } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";

const Zenpot = (props) => {
  const planters = props.products || [];
  const [filteredProducts, setFilteredProducts] = useState(planters);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [displayedProductsCount, setDisplayedProductsCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setDisplayedProductsCount(Math.min(showCount, filteredProducts.length));
  }, [filteredProducts, showCount]);

  const handleFilterChange = (filters) => {
    let filtered = [...planters];

    if (filters.type?.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product && product.category && filters.type.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredProducts];

    switch (sortType) {
      case "name-asc":
        sorted.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        sorted = [...planters];
    }

    setFilteredProducts(sorted);
  };

  const handleShowCountChange = (count) => {
    setShowCount(parseInt(count));
  };

  const validProducts = filteredProducts || [];

  return (
    <div className="w-full bg-[#FFFCF8] min-h-screen">
      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white transform transition-transform duration-300 ease-in-out z-40 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <StoreTools
          totalProducts={planters.length}
          displayedProducts={displayedProductsCount}
          onFilterChange={handleFilterChange}
          onSortChange={handleSort}
          onShowCountChange={handleShowCountChange}
          sortBy={sortBy}
          showCount={showCount}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </div>

      {/* Main Content Wrapper */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          isFilterOpen ? "ml-[300px]" : "ml-0"
        }`}
      >
        <TopSegment />

        {/* Filter Toggle Button */}
        <div className="sticky top-0 z-30 bg-gray-50 w-full px-4 py-6 md:px-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border"
          >
            <TuneIcon className="text-gray-500" />
            Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="mt-10 mb-20 w-full flex flex-col justify-center items-center">
          <div className="max-w-[1440px] w-full grid grid-cols-2 xl:grid-cols-3 gap-12">
            {validProducts.slice(0, showCount).map((product, index) => (
              <Link key={index} href={`/store/planters/${product.productId}`}>
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
  const products = await findAllProducts("planters");
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

export default Zenpot;
