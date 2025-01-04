/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { XCircle, AlertCircle, ArrowRight, PackageOpen } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Failed = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (router.query.orderSummary) {
      try {
        const summary = JSON.parse(
          decodeURIComponent(router.query.orderSummary)
        );
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
    <div className="min-h-screen bg-[#fffbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Error Status */}
        <div className="text-center mb-8">
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            We couldn't process your payment. Don't worry, no charges were made.
          </p>
        </div>

        {/* Alert */}
        <Alert className="mb-8 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Your payment was declined. Please check your payment details and try
            again.
          </AlertDescription>
        </Alert>

        {orderDetails && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PackageOpen className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Customer Details */}
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600">
                    Email:{" "}
                    <span className="font-medium text-gray-900">
                      {orderDetails.email}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Amount:{" "}
                    <span className="font-medium text-gray-900">
                      ₹{(parseFloat(orderDetails.totalAmount) / 100).toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Products */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Products</h3>
                  {orderDetails.products && orderDetails.products.length > 0 ? (
                    orderDetails.products.map((product, index) => (
                      <div key={index} className="space-y-2">
                        {product.selectedProducts.map(
                          (selectedProduct, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center py-2 text-sm"
                            >
                              <span className="text-gray-800">
                                {selectedProduct.productName ||
                                  "Product Name here"}
                              </span>
                              <span className="font-medium">
                                ₹{selectedProduct.price || "0"}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No products found</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        <Link href="/store" className="block">
          <button className="w-full bg-black text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            <span className="font-medium">Try Again</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Failed;
