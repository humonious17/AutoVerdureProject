import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import findCartProducts from "@/lib/server/findCartProducts";

const countryCodes = [
  { code: "+91", country: "IN", name: "India" },
  { code: "+1", country: "US", name: "United States" },
  { code: "+44", country: "UK", name: "United Kingdom" },
];

const validateForm = (formData) => {
  const errors = {};
  if (!formData.fullName?.trim()) errors.fullName = "Full name is required";
  if (!formData.streetName?.trim())
    errors.streetName = "Street name is required";
  if (!formData.houseNumber?.trim())
    errors.houseNumber = "House number is required";
  if (!formData.city?.trim()) errors.city = "City is required";
  if (!formData.country?.trim()) errors.country = "Country is required";
  if (!formData.zipCode?.trim()) errors.zipCode = "ZIP code is required";
  if (!formData.phone?.trim()) errors.phone = "Phone number is required";

  const phoneRegex = /^\+?[\d\s-]{8,}$/;
  if (formData.phone && !phoneRegex.test(formData.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

const Shipping = ({ email, cartProducts }) => {
  const router = useRouter();
  const { query } = router;
  const isBuyNow = Boolean(query.productId);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    streetName: "",
    houseNumber: "",
    city: "",
    phone: "",
    countryCode: "+91",
    country: "",
    zipCode: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCountryCodeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: value,
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
    setIsLoading(true);
    setError("");

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      toast({
        title: "Validation Error",
        description: "Please check all required fields",
        variant: "destructive",
      });
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
          shippingDetails: {
            ...formData,
            phone: `${formData.countryCode}${formData.phone}`,
          },
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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

          {Object.keys(formData).map((field) => {
            if (field === "countryCode") return null;

            return (
              <div key={field} className="flex flex-col mb-4">
                <label className="text-sm font-semibold text-[#070707] mb-2">
                  {field
                    .split(/(?=[A-Z])/)
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </label>
                {field === "phone" ? (
                  <div className="flex gap-x-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={handleCountryCodeChange}
                    >
                      <SelectTrigger className="w-[100px] h-[48px] rounded-full bg-[#fffbf7]">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} ({country.country})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      name="phone"
                      placeholder="Phone number"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={fieldErrors.phone}
                      className="flex-1 rounded-full border border-gray-300"
                    />
                  </div>
                ) : (
                  <Input
                    name={field}
                    placeholder={field.split(/(?=[A-Z])/).join(" ")}
                    type="text"
                    value={formData[field]}
                    onChange={handleInputChange}
                    error={fieldErrors[field]}
                    className="rounded-full border border-gray-300"
                  />
                )}
              </div>
            );
          })}

          <Button
            type="submit"
            className="w-full rounded-full bg-primaryMain"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </Button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
