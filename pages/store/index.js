import React, { useState } from "react";
import ProductCard from "@/app/ui/Store/ProductCard";
import Link from "next/link";
import TopSegment from "@/app/ui/Store/TopSegment";
import StoreTools from "@/app/ui/Store/StoreTools";
import findAllProducts from "/pages/api/products/findAllProducts";
import TuneIcon from "@mui/icons-material/Tune";

const Store = ({ initialProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(16);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  // Handle filtering of products
  const handleFilterChange = (filters) => {
    let filtered = [...initialProducts];

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
    let sorted = [...filteredProducts].filter(Boolean);

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
    <div className="w-full bg-[#FFFCF8] min-h-screen">
      <TopSegment />

      <div className="relative flex">
        {/* Filter Panel */}
        <div
          className={`fixed top-0 left-0 h-screen bg-white transform transition-transform duration-300 ease-in-out z-40 ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "300px" }}
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

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isFilterOpen ? "ml-[300px]" : "ml-0"
          }`}
        >
          <div className="sticky top-0 z-30 bg-gray-50 w-full">
            <div className="px-4 py-6 md:px-8">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border"
                >
                  <TuneIcon />
                  Filters
                </button>
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="py-2 px-3 text-sm border rounded-lg bg-white"
                  >
                    <option value="default">Sort by</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
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

          <div className="p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {validProducts.slice(0, showCount).map((product, index) => (
                <Link
                  key={product.productId || index}
                  href={`/store/${product.category}/${product.productId}`}
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  console.log("Fetching products for store page...");

  try {
    const zenpot = (await findAllProducts("zenpot")) || [];
    const grobox = (await findAllProducts("grobox")) || [];
    const plants = (await findAllProducts("plants")) || [];
    const accessory = (await findAllProducts("accessory")) || [];

    // Combine all products and add category, filter out invalid entries
    const allProducts = [
      ...zenpot.map((p) => (p ? { ...p, category: "zenpot" } : null)),
      ...grobox.map((p) => (p ? { ...p, category: "grobox" } : null)),
      ...plants.map((p) => (p ? { ...p, category: "plants" } : null)),
      ...accessory.map((p) => (p ? { ...p, category: "accessory" } : null)),
    ].filter(Boolean); // Remove any null values

    // Validate the structure of each product
    const validProducts = allProducts
      .map((product) => {
        if (!product || typeof product !== "object") return null;

        return {
          ...product,
          name: product.name || "Unnamed Product",
          price: parseFloat(product.price) || 0,
          productId: product.productId || `product-${Math.random()}`,
          category: product.category || "uncategorized",
        };
      })
      .filter(Boolean);

    return {
      props: {
        initialProducts: validProducts,
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
