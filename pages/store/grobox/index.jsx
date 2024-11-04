import React, { useState, useEffect } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";

const Grobox = (props) => {
  const grobox = props.products || [];
  const [filteredProducts, setFilteredProducts] = useState(grobox); // Initialize with zenpot
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [displayedProductsCount, setDisplayedProductsCount] = useState(0);

  // Safe string getter for sorting
  const getSafeString = (obj, key) => {
    if (!obj || typeof obj !== "object") return "";
    return (obj[key] || "").toString().toLowerCase();
  };

  // Safe number getter for sorting
  const getSafeNumber = (obj, key) => {
    if (!obj || typeof obj !== "object") return 0;
    const value = parseFloat(obj[key]);
    return isNaN(value) ? 0 : value;
  };

  // Update displayedProductsCount based on filteredProducts and showCount
  useEffect(() => {
    setDisplayedProductsCount(Math.min(showCount, filteredProducts.length));
  }, [filteredProducts, showCount]);

  // Handle filtering of products
  const handleFilterChange = (filters) => {
    let filtered = [...grobox]; // Use grobox for initial filtering

    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product && product.category && filters.type.includes(product.category)
      );
    }

    // Filter by pot type
    if (filters.pot.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product && product.potType && filters.pot.includes(product.potType)
      );
    }

    // Filter by material
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

  // Handle sorting of products
  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredProducts].filter(Boolean); // Remove null/undefined items

    switch (sortType) {
      case "name-asc":
        sorted.sort((a, b) =>
          getSafeString(a, "productName").localeCompare(
            getSafeString(b, "productName")
          )
        );
        break;
      case "name-desc":
        sorted.sort((a, b) =>
          getSafeString(b, "productName").localeCompare(
            getSafeString(a, "productName")
          )
        );
        break;
      case "price-asc":
        sorted.sort(
          (a, b) =>
            getSafeNumber(a, "productPrice") - getSafeNumber(b, "productPrice")
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) =>
            getSafeNumber(b, "productPrice") - getSafeNumber(a, "productPrice")
        );
        break;
      default:
        // Reset to original order
        sorted = [...grobox].filter(Boolean);
    }

    setFilteredProducts(sorted);
  };

  // Handle show count change
  const handleShowCountChange = (count) => {
    setShowCount(parseInt(count));
  };

  // Ensure we have valid products to display
  const validProducts = filteredProducts.filter(
    (product) => product && product.productId && product.category
  );

  return (
    <div className="w-full bg-[#FFFCF8]">
      <TopSegment />

      <StoreTools
        totalProducts={grobox.length}
        displayedProducts={displayedProductsCount}
        onFilterChange={handleFilterChange}
        onSortChange={handleSort}
        onShowCountChange={handleShowCountChange}
        sortBy={sortBy}
        showCount={showCount}
      />

      <div className="mt-[42px] md:mt-[58px] xl:mt-[110px] mb-[70.46px] md:mb-[124.8px] xl:mb-[142.3px] w-full flex flex-col justify-center items-center">
        <div className="max-w-[359px] md:max-w-[750.998px] xl:max-w-[1312px] w-full grid grid-cols-2 xl:grid-cols-3 gap-x-[9px] gap-y-[41.46px] md:gap-x-[43.21px] md:gap-y-16 xl:gap-x-[49px] xl:gap-y-[48px]">
          {grobox.map((product, index) => (
            <Link key={index} href={`/store/grobox/${product.productId}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await findAllProducts("grobox");
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

export default Grobox;
