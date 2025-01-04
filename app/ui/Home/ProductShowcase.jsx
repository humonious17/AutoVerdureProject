import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProductShowcase = ({ productType = "plants" }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
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
      <div className="flex justify-center items-center h-[400px] animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin" />
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Card className="w-full max-w-md bg-red-50">
          <CardContent className="flex flex-col items-center p-6">
            <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Card className="w-full max-w-md bg-gray-50">
          <CardContent className="flex flex-col items-center p-6">
            <p className="text-gray-600 text-lg">No products available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-16 md:mt-36 xl:mt-56 max-w-[361px] md:max-w-[754px] xl:max-w-[1312px] w-full mx-auto px-4">
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-4xl xl:text-[38px] font-medium text-gray-900">
          Loved by buyers
        </h2>
        <Link
          href="/store"
          className="group flex items-center gap-2 hover:text-primary transition-colors duration-200"
        >
          <span className="hidden xl:inline-block">Browse all products</span>
          <Image
            src="/rightArr.svg"
            alt="Browse"
            width={18}
            height={19}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Mobile Layout */}
      <div className="xl:hidden w-full relative">
        <Link
          href={`/store/${productType}/${products[currentIndex].productId}`}
          className="block transform transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
              src={products[currentIndex].images[0].publicUrl}
              alt={products[currentIndex].productName}
              width={361}
              height={400}
              priority
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-xs font-medium tracking-wider uppercase text-primaryMain">
                In Stock
              </p>
            </div>
          </div>
        </Link>

        <div className="mt-6 space-y-2">
          <h3 className="text-xl font-medium text-gray-900">
            {products[currentIndex].productName}
          </h3>
          <p className="text-sm italic text-gray-600">
            {products[currentIndex].productSubtitle ||
              "Product subtitle goes here"}
          </p>
          <p className="text-lg font-medium text-primary">
            From ₹{products[currentIndex].productPrice}
          </p>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:flex w-full gap-10">
        {/* Main large image */}
        <Link
          href={`/store/${productType}/${products[0].productId}`}
          className="block flex-1 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-[668px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
              src={products[0].images[0].publicUrl}
              alt={products[0].productName}
              width={636}
              height={796}
              priority
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-sm font-medium tracking-wider uppercase text-primaryMain">
                In Stock
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <h3 className="text-2xl font-medium text-white mb-2">
                {products[0].productName}
              </h3>
              <p className="text-lg text-gray-200 mb-2">
                {products[0].productSubtitle || "Product subtitle goes here"}
              </p>
              <p className="text-xl font-medium text-white">
                From ₹{products[0].productPrice}
              </p>
            </div>
          </div>
        </Link>

        {/* Grid for smaller images */}
        <div className="grid grid-cols-2 gap-8 content-start">
          {products.slice(1, 5).map((product) => (
            <Link
              key={product._id}
              href={`/store/${productType}/${product.productId}`}
              className="block transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative w-[298px] h-[315px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                  src={product.images[0].publicUrl}
                  alt={product.productName}
                  width={298}
                  height={315}
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                  <p className="text-xs font-medium tracking-wider uppercase text-primaryMain">
                    In Stock
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-200 mb-1">
                    {product.productSubtitle || "Product subtitle goes here"}
                  </p>
                  <p className="text-base font-medium text-white">
                    From ₹{product.productPrice}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
