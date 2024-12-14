import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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

  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
      countryCode: `+${country.dialCode}`,
      country: country.countryCode.toUpperCase(),
    }));
    // Clear phone error when a valid phone is entered
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: "" }));
    }
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
            phone: formData.phone, // Phone is now already in full international format
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

          {Object.keys(formData)
            .filter((field) => field !== "countryCode")
            .map((field) => {
              if (field === "phone") {
                return (
                  <div key={field} className="flex flex-col mb-4">
                    <label className="text-sm font-semibold text-[#070707] mb-2">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "9999px",
                        border: fieldErrors.phone
                          ? "1px solid red"
                          : "1px solid #D1D5DB",
                      }}
                      buttonStyle={{
                        borderRadius: "9999px 0 0 9999px",
                        border: fieldErrors.phone
                          ? "1px solid red"
                          : "1px solid #D1D5DB",
                      }}
                      placeholder="Enter phone number"
                      searchPlaceholder="Search country"
                      enableSearch={true}
                    />
                    {fieldErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                );
              }

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
                  <Input
                    name={field}
                    placeholder={field.split(/(?=[A-Z])/).join(" ")}
                    type="text"
                    value={formData[field]}
                    onChange={handleInputChange}
                    error={fieldErrors[field]}
                    className="rounded-full border border-gray-300 bg-white focus:bg-primaryMain/10"
                  />
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
