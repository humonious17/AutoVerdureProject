import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const ProductImageGallery = ({ orderDetails }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Determine grid columns based on number of images
  const getGridColumns = (totalImages) => {
    if (totalImages <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (totalImages <= 3) return "grid-cols-1 sm:grid-cols-3";
    if (totalImages <= 4) return "grid-cols-1 sm:grid-cols-4";
    return "grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  };

  // Flatten products into a single array of images
  const productImages =
    orderDetails?.products?.flatMap((product) =>
      product.selectedProducts.map((selectedProduct) => ({
        image: selectedProduct.productImage || "/orderconfirmed.png",
        name: selectedProduct.productName || "Product",
      }))
    ) || [];

  // Determine dynamic grid columns
  const gridColumnClass = getGridColumns(productImages.length);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full">
      {/* Image Grid */}
      <div className={`grid ${gridColumnClass} gap-4 sm:gap-6 place-items-center`}>
        {productImages.map((product, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-[#fffbf7] rounded-xl overflow-hidden shadow-lg relative group cursor-pointer w-[200px] h-[200px]"
            onClick={() => openImageModal(product.image)}
          >
            {/* Image Container */}
            <div className="w-full h-full relative">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Successful = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (router.query.orderSummary) {
      try {
        const summary = JSON.parse(
          decodeURIComponent(router.query.orderSummary)
        );
        // Ensure products is always an array
        summary.products = Array.isArray(summary.products)
          ? summary.products
          : [summary.products];
        setOrderDetails(summary);
      } catch (error) {
        console.error("Error parsing order summary:", error);
      }
    }
  }, [router.query]);

  return (
    <div className="bg-[#fffbf7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-md text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-lg text-gray-600">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Details Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images Carousel */}
          <ProductImageGallery orderDetails={orderDetails} />

          {/* Order Summary Card */}
          <div className="bg-[#fffbf7] rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Order Confirmed
            </h2>

            {orderDetails && (
              <div className="space-y-6">
                {/* Order Summary Section */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-xl mb-3 text-gray-800">
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Order ID:</span>{" "}
                      {orderDetails.orderId}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {orderDetails.email}
                    </p>
                    <p>
                      <span className="font-medium">Total Amount:</span> ₹
                      {(parseFloat(orderDetails.totalAmount) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Shipping Details Section */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-xl mb-3 text-gray-800">
                    Shipping Details
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p>{orderDetails.shipping.fullName}</p>
                    <p>{orderDetails.shipping.address1}</p>
                    <p>{orderDetails.shipping.address2}</p>
                    <p>{orderDetails.shipping.postalCode}</p>
                    <p>Phone: {orderDetails.shipping.phone}</p>
                  </div>
                </div>

                {/* Products Section */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-xl mb-3 text-gray-800">
                    Products
                  </h3>
                  <div className="space-y-2">
                    {orderDetails.products &&
                    orderDetails.products.length > 0 ? (
                      orderDetails.products.map((product, index) => (
                        <div key={index} className="space-y-2">
                          {product.selectedProducts.map(
                            (selectedProduct, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm text-gray-700"
                              >
                                <span className="font-medium">
                                  {selectedProduct.productName ||
                                    "Product Name"}
                                </span>
                                <span>₹{selectedProduct.price || "0"}</span>
                              </div>
                            )
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">No products found</p>
                    )}
                  </div>
                </div>

                {/* Back to Shopping Button */}
                <Link href="/store" passHref>
                  <button className="w-full py-4 text-base font-bold rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300 flex justify-center items-center">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
