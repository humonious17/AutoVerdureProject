import React, { useState } from "react";
import Image from "next/image";

const PaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentMethods = [
    { id: "card", icon: "/card.svg", label: "Card", width: 16, height: 16 },
    { id: "upi", icon: "/upi.png", label: "UPI", width: 51, height: 18 },
    {
      id: "wallet",
      icon: "/wallet.png",
      label: "Wallets",
      width: 16,
      height: 16,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Card Container */}
        <div className="bg-[#fffbf7] rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-[#fffbf7] border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Details
            </h2>
          </div>

          {/* Payment Method Selection */}
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <Image
                    src={method.icon}
                    alt={method.label}
                    width={method.width}
                    height={method.height}
                    className="mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {method.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Card Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:primaryMain focus:border-transparent transition-all"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    {[
                      "/visa.svg",
                      "/master.svg",
                      "/americanexp.svg",
                      "/discover.svg",
                    ].map((card, index) => (
                      <Image
                        key={index}
                        src={card}
                        alt="card"
                        width={24}
                        height={16}
                        className="opacity-50"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryMain focus:border-transparent"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryMain focus:border-transparent"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:primaryMain focus:border-transparent bg-white">
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="RU">Russia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:primaryMain focus:border-transparent"
                    placeholder="90210"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#fffbf7] border-t border-gray-200">
            <button className="w-full sm:w-auto px-6 py-3 bg-primaryMain text-white font-medium rounded-lg hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:primaryMain focus:ring-offset-2">
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
