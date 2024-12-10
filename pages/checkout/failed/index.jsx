/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Failed = () => {
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
    <div className="mb-[95px] sm:mb-[58px] xl:mb-[105px] w-full px-11 sm:px-5 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[560px] w-full flex flex-col gap-y-3 sm:text-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Oops! Something went wrong.
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
          Your payment failed. Please try again.
        </p>
      </div>

      {/* Content */}
      <div className="mt-5 sm:mt-[69px] max-w-[724px] w-full flex flex-col sm:flex-row sm:gap-x-6">
        <div className="w-full h-[350px] sm:w-[350px]">
          <Image
            className="w-full h-full object-contain"
            src="/paymentfailed.png" // Replace with an appropriate image
            alt="Payment Failed"
            width={350}
            height={350}
          />
        </div>

        <div className="mt-[47px] sm:mt-0 w-full px-6 py-7 rounded-2xl flex flex-col gap-y-6 bg-[#FFFFFF] shadow-sm">
          <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
            Don't worry, you can try again!
          </p>

          {orderDetails && (
            <div className="flex flex-col gap-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {/* You might want to remove Order ID here as the order wasn't placed */}
                  <p>Email: {orderDetails.email}</p>
                  <p>
                    Total Amount: ₹
                    {(parseFloat(orderDetails.totalAmount) / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* You might want to remove Shipping Details as the order wasn't placed */}

              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Products</h3>
                <div className="space-y-2">
                  {orderDetails.products && orderDetails.products.length > 0 ? (
                    orderDetails.products.map((product, index) => (
                      <div key={index} className="space-y-2">
                        {product.selectedProducts.map(
                          (selectedProduct, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm text-gray-600"
                            >
                              <span>
                                {selectedProduct.productName ||
                                  "Product Name here"}
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
            </div>
          )}

          <Link href="/store" passHref>
            <button className="w-full py-[17px] text-base leading-[20.8px] font-bold rounded-[30px] bg-[#070707] text-white flex justify-center items-center">
              Back to Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failed;
