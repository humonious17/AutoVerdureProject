import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductShowcase = ({ productType = "plants" }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Use the correct API route path
        const response = await fetch(`/api/route?type=${productType}`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
          setError(null);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error("Product fetch error:", err);
        setError(err.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productType]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px] text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="mt-16 md:mt-36 xl:mt-56 max-w-[361px] md:max-w-[754px] xl:max-w-[1312px] w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl md:text-4xl xl:text-[38px] leading-[49.4px] font-normal text-[#0E0E0E]">
          Loved by buyers
        </p>
        <div className="flex gap-2 xl:pb-3 xl:border-b xl:border-[#BBBBBB]">
          <Link href="/store" className="hidden xl:flex">
            Browse all products
          </Link>
          <Image src="/rightArr.svg" alt="Browse" width={18} height={19} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="xl:hidden w-full relative mt-8">
        <Link
          href={`/store/${productType}/${products[currentIndex].productId}`}
          className="block"
        >
          <div className="relative w-full h-[400px] rounded-[44px]">
            <Image
              className="object-cover rounded-[44px] w-full h-full"
              src={products[currentIndex].images[0].publicUrl}
              alt={products[currentIndex].productName}
              width={361}
              height={400}
              priority
            />
            <div className="text-xs leading-4 tracking-wider uppercase text-[#333] rounded-[40px] px-4 py-3 absolute top-6 left-6 bg-white">
              <p>In Stock</p>
            </div>
          </div>
        </Link>

        <div className="mt-6">
          <p className="text-xl leading-6 text-[#000]">
            {products[currentIndex].productName}
          </p>
          <p className="text-sm italic leading-6 text-[#000]">
            {products[currentIndex].productSubtitle ||
              "product subtitle goes here"}
          </p>
          <p className="mt-3 text-base leading-5 text-[#0E0E0E]">
            From Rs. {products[currentIndex].productPrice}
          </p>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={prevSlide}
            className="bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="mt-6 hidden xl:flex w-full h-fit gap-10">
        {/* Main large image container */}
        <Link
          href={`/store/${productType}/${products[0].productId}`}
          className="block rounded-[44px] flex-1 h-[796px]"
        >
          <div className="relative h-full w-full">
            <div className="h-full w-full drop-shadow-lg">
              <Image
                className="object-cover rounded-[44px] w-full h-full"
                src={products[0].images[0].publicUrl}
                alt={products[0].productName}
                width={636}
                height={796}
                priority
              />
              <div className="mt-5">
                <p className="text-[21px] leading-[25.2px] text-[#000]">
                  {products[0].productName}
                </p>
                <p className="text-sm mt-[13.96px] text-[17px] leading-5 text-[#0E0E0E]">
                  {products[0].productSubtitle || "product subtitle goes here"}
                </p>
                <p className="text-[17px] leading-5 text-[#0E0E0E]">
                  From Rs. {products[0].productPrice}
                </p>
              </div>
            </div>
            <div className="text-[13px] leading-4 tracking-[0.56px] uppercase text-[#333] rounded-[40px] px-[14px] py-[13px] absolute top-6 left-6 bg-white">
              <p>In Stock</p>
            </div>
          </div>
        </Link>

        {/* Grid for smaller images */}
        <div className="grid grid-cols-2 gap-8 gap-y-16">
          {products.slice(1).map((product) => (
            <Link
              key={product._id}
              href={`/store/${productType}/${product.productId}`}
              className="block w-[298px] h-[315px] rounded-[44px]"
            >
              <div className="relative w-full h-full drop-shadow-lg">
                <Image
                  className="object-cover rounded-[44px] w-full h-full"
                  src={product.images[0].publicUrl}
                  alt={product.productName}
                  width={298}
                  height={315}
                />
                <div className="text-[13px] leading-4 tracking-[0.56px] uppercase text-[#333] rounded-[40px] px-[14px] py-[13px] absolute top-6 left-6 bg-white">
                  <p>In Stock</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[21px] leading-[25.2px] text-[#000]">
                  {product.productName}
                </p>
                <p className="text-sm leading-[25.2px] text-[#000]">
                  {product.productSubtitle || "product subtitle goes here"}
                </p>
                <p className="text-[17px] leading-5 text-[#0E0E0E]">
                  From Rs. {product.productPrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
