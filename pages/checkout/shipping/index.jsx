import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import findCartProducts from "@/lib/server/findCartProducts";
import { ChevronDown } from "lucide-react";


const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+91", country: "IN" },
  { code: "+44", country: "UK" },
  // Add more country codes as needed
];

const Shipping = (props) => {
  const { email, cartProducts } = props;
  const router = useRouter();
  const { query } = router;
  const isBuyNow = Boolean(query.productId);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    FullName: "",
    StreetName: "",
    HouseNumber: "",
    City: "",
    Phone: "",
    Country: "",
    ZipCode: "",
  });

  useEffect(() => {
    // Check if we have either email or user is logged in
    const storedEmail = localStorage.getItem("userEmail");
    if (!email && !storedEmail) {
      router.push({
        pathname: "/checkout/guest",
        query: isBuyNow
          ? {
              productId: query.productId,
              productName: query.productName,
              productPrice: query.productPrice,
              productQuantity: query.productQuantity,
              productColor: query.productColor,
              productSize: query.productSize,
              productStyle: query.productStyle,
              productType: query.productType,
              productImage: query.productImage,
            }
          : {},
      });
      return;
    }

    // Only check for cart products if it's not a Buy Now flow
    if (!isBuyNow && (!cartProducts || cartProducts.length === 0)) {
      router.push("/cart");
    }
  }, [router, email, cartProducts, isBuyNow, query]);

  const validateForm = () => {
    const errors = {};
    const fields = Object.keys(formData);

    fields.forEach((field) => {
      if (!formData[field].trim()) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (formData.phone && !/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.zipCode && !/^\d{6}$/.test(formData.zipCode.trim())) {
      errors.zipCode = "Please enter a valid 6-digit ZIP code";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (isBuyNow) {
      return (
        parseFloat(query.productPrice || 0) *
        (parseInt(query.productQuantity) || 1)
      );
    }
    return (
      cartProducts?.reduce((total, product) => {
        return total + product.price * product.productQty;
      }, 0) || 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const total = calculateTotal();

      // Create products object based on checkout type
      const products = {
        selectedProducts: isBuyNow
          ? [
              {
                price: parseFloat(query.productPrice),
                productQty: parseInt(query.productQuantity || 1),
                productId: query.productId,
                productName: query.productName,
                productColor: query.productColor,
                productSize: query.productSize,
                productStyle: query.productStyle,
                productType: query.productType,
                productImage: query.productImage,
              },
            ]
          : cartProducts.map((product) => ({
              price: product.price,
              productQty: product.productQty,
              productId: product.productId,
              productName: product.productName,
              productType: product.productType,
              productImage: product.productImage,
            })),
      };

      const result = await fetch("/api/createRazorpayOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total * 100,
          products,
          shippingDetails: formData,
          email: email || localStorage.getItem("userEmail"),
          isBuyNow,
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to create order");
      }

      const { id: orderId } = await result.json();

      // Encode data for URL
      const encodedShippingDetails = encodeURIComponent(
        JSON.stringify(formData)
      );
      const encodedProducts = encodeURIComponent(JSON.stringify(products));

      router.push({
        pathname: "/checkout/payment",
        query: {
          orderId,
          shippingDetails: encodedShippingDetails,
          products: encodedProducts,
          amount: total * 100,
          email: email || localStorage.getItem("userEmail"),
          buyNow: isBuyNow,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to process order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-[95px] sm:mb-[58px] xl:mb-[105px] w-full px-11 sm:px-0 flex flex-col justify-center items-center">
      <div className="mb-[42px] sm:mb-[52px] max-w-[560px] w-full flex flex-col gap-y-3 sm:justify-center sm:items-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Shipping Details
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94] sm:text-center">
          Please enter your shipping information
        </p>
      </div>

      <div className="max-w-[560px] w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-6">
          {error && (
            <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {Object.keys(formData).map(
            (field) =>
              field !== "phone" &&
              field !== "countryCode" && (
                <Input
                  key={field}
                  name={field}
                  label={field.split(/(?=[A-Z])/).join(" ")}
                  placeholder={field.split(/(?=[A-Z])/).join(" ")}
                  type={field === "zipCode" ? "tel" : "text"}
                  value={formData[field]}
                  onChange={handleInputChange}
                  error={fieldErrors[field]}
                  className="rounded-full"
                />
              )
          )}

          <div className="flex gap-4">
            <div className="relative w-1/4">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="appearance-none w-full p-3 rounded-full bg-white border-2 border-black pr-10 focus:outline-none focus:border-primaryMain transition-colors duration-300"
              >
                {countryCodes.map((code) => (
                  <option key={code.code} value={code.code}>
                    {code.country} ({code.code})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <ChevronDown className="text-gray-500" size={20} />
              </div>
            </div>

            <Input
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              error={fieldErrors.phone}
              className="w-3/4 rounded-full"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-[42px] sm:mt-[52px] w-full text-base px-6 py-[17px] rounded-[30px] border-[1px] bg-[#070707] border-[#070707] text-[#FFFFFF] font-bold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, query }) {
  const currentUser = require("@/lib/server/currentUser").default;
  const user = await currentUser(req);

  // Check if this is a Buy Now flow
  const isBuyNow = Boolean(query.productId);

  // Only fetch cart products if it's not a Buy Now flow
  let cartProducts = [];
  if (!isBuyNow) {
    const cartId = req.cookies.cartId || null;
    cartProducts = await findCartProducts(cartId);

    // Only redirect if it's a cart checkout and there are no products
    if (!cartProducts || cartProducts.length === 0) {
      return {
        redirect: {
          destination: "/cart",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      email: user?.email || null,
      cartProducts: cartProducts || [],
    },
  };
}

export default Shipping;
