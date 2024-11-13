import React, { useState, useEffect } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";
import Image from "next/image";
const Plants = (props) => {
  const plants = props.products || []; // Ensure we handle cases where props.products is undefined
  const [filteredProducts, setFilteredProducts] = useState(plants);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [displayedProductsCount, setDisplayedProductsCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debugging the initial data
  useEffect(() => {
    console.log("Fetched Plants:", plants);
  }, [plants]);

  useEffect(() => {
    setDisplayedProductsCount(Math.min(showCount, filteredProducts.length));
  }, [filteredProducts, showCount]);

  const handleFilterChange = (filters) => {
    let filtered = [...plants];

    // Debugging filter input
    console.log("Filters:", filters);

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

    // Debugging filtered results
    console.log("Filtered Products:", filtered);

    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredProducts].filter(Boolean);

    if (sortType === "name-asc") {
      sorted.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortType === "name-desc") {
      sorted.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (sortType === "price-asc") {
      sorted.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortType === "price-desc") {
      sorted.sort((a, b) => b.productPrice - a.productPrice);
    }

    // Debugging sorted results
    console.log("Sorted Products:", sorted);

    setFilteredProducts(sorted);
  };

  const handleShowCountChange = (count) => {
    setShowCount(parseInt(count));
  };

  const validProducts = filteredProducts.filter(
    (product) => product && product.productId && product.category
  );

  // Debugging valid products
  useEffect(() => {
    console.log("Valid Products:", validProducts);
  }, [validProducts]);

  return (
    <div className="w-full bg-[#FFFCF8] min-h-screen">
      <div
        className={`fixed top-0 left-0 h-screen bg-white transform transition-transform duration-300 ease-in-out z-40 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <StoreTools
          totalProducts={plants.length}
          displayedProducts={displayedProductsCount}
          onFilterChange={handleFilterChange}
          onSortChange={handleSort}
          onShowCountChange={handleShowCountChange}
          sortBy={sortBy}
          showCount={showCount}
        />
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          isFilterOpen ? "ml-[300px]" : "ml-0"
        }`}
      >
        <TopSegment />
 
       {/* Sorting and Filtering Section */}
<div className="sticky top-0 z-30 bg-gray-50 w-full">
  <div className="px-4 py-6 md:px-8">
    <div className="flex justify-between items-center">
      {/* Filter Toggle Button with Grid/List Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border"
        >
          <TuneIcon />
          Filters
        </button>
        {/* Grid and List View Icons */}
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

              {/* Sort and Show Count Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="py-2 px-3 text-sm border rounded-lg bg-white"
                >
                  <option value="default">Sort by</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                <select
                  value={showCount}
                  onChange={(e) => handleShowCountChange(e.target.value)}
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

        <div className="mt-10 mb-20 w-full flex flex-col justify-center items-center">
          <div className="max-w-[1440px] w-full grid grid-cols-2 xl:grid-cols-3 gap-12">
          {filteredProducts.map((product, index) => (
           <Link key={index} href={`/store/plants/${product.productId}`}>
             <ProductCard product={product} />
           </Link>
          ))}

            {/* {validProducts.length === 0 && (
              <p className="text-center text-gray-500">No products found.</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await findAllProducts("plants");
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

export default Plants;
