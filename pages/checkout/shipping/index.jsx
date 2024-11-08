import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import findCartProducts from "@/lib/server/findCartProducts";

const Input = ({ label, placeholder, type, name, value, onChange, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-3">
      <label className="text-2xl leading-6 capitalize font-normal text-[#070707]">
        {label}
      </label>
      <div className={`w-full text-base px-4 py-3 leading-[25.6px] rounded-[84px] border-[1px] ${
        error ? 'border-red-500' : 'border-[#070707]'
      } text-[#070707] bg-[#FFFFFF] font-medium flex gap-5 justify-between`}>
        <input
          className="w-full h-fit text-base focus:outline-none"
          placeholder={placeholder}
          type={isVisible ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
        {type === "password" && (
          <Image
            className="cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
            src="/eye.svg"
            alt="eye"
            width={24}
            height={24}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const Shipping = (props) => {
  const { email, cartProducts } = props;
  const router = useRouter();
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
    if (!email) {
      router.push("/checkout/guest");
    }
    if (!cartProducts || cartProducts.length === 0) {
      router.push("/cart");
    }
  }, [router, email, cartProducts]);

  const validateForm = () => {
    const errors = {};
    const fields = Object.keys(formData);
    
    fields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      return total + (product.price * product.productQty);
    }, 0);
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
      
      // Format products for order creation
      const products = {
        selectedProducts: cartProducts.map(product => ({
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
          amount: total * 100, // Convert to paise
          products,
          shippingDetails: formData,
          email,
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to create order");
      }

      const { id: orderId } = await result.json();

      // Encode data for URL
      const encodedShippingDetails = encodeURIComponent(JSON.stringify(formData));
      const encodedProducts = encodeURIComponent(JSON.stringify(products));

      router.push({
        pathname: "/checkout/payment",
        query: {
          orderId,
          shippingDetails: encodedShippingDetails,
          products: encodedProducts,
          amount: total * 100,
          email,
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
          
          {Object.keys(formData).map(field => (
            <Input
              key={field}
              name={field}
              label={field.split(/(?=[A-Z])/).join(" ")}
              placeholder={field.split(/(?=[A-Z])/).join(" ")}
              type={field === "phone" || field === "zipCode" ? "tel" : "text"}
              value={formData[field]}
              onChange={handleInputChange}
              error={fieldErrors[field]}
            />
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-[42px] sm:mt-[52px] w-full text-base px-6 py-[17px] rounded-[30px] border-[1px] bg-[#070707] border-[#070707] text-[#FFFFFF] font-bold ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = require("@/lib/server/currentUser").default;
  const user = await currentUser(req);

  // Get cart products
  const cartId = req.cookies.cartId || null;
  const cartProducts = await findCartProducts(cartId);

  if (!cartProducts || cartProducts.length === 0) {
    return {
      redirect: {
        destination: "/cart",
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: user?.email || null,
      cartProducts: cartProducts || [],
    },
  };
}

export default Shipping;


 
