import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Input = ({ label, placeholder, type, name, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-3">
      <label className="text-2xl leading-6 capitalize font-normal text-[#070707]">
        {label}
      </label>
      <div className="w-full text-base px-4 py-3 leading-[25.6px] rounded-[84px] border-[1px] border-[#070707] text-[#070707] bg-[#FFFFFF] font-medium flex gap-5 justify-between">
        <input
          className="w-full h-fit text-base focus:outline-none"
          placeholder={placeholder}
          type={isVisible ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
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
    </div>
  );
};

const Shipping = (props) => {
  const email = props.email || null;
  const router = useRouter();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    streetName: '',
    houseNumber: '',
    city: '',
    phone: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    if (!email) {
      router.push('/checkout/guest');
    }
  }, [router, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).includes('')) {
      setError('Please fill in all the fields');
      return false;
    }

    setError(false);

    // Example products data, replace with actual selected products
    const products = {
      selectedProducts: [
        { price: 500, productQty: 2 },
        // ...other selected products
      ]
    };

    const result = await fetch('/api/createRazorpayOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }), // Ensure products data is sent
    });

    if (result.ok) {
      const resp = await result.json();
      const orderId = resp.id;
      router.push(`/checkout/payment?orderId=${orderId}`);
    }
};

  return (
    <div className="mb-[95px] sm:mb-[58px] xl:mb-[105px] w-full px-11 sm:px-0 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="mb-[42px] sm:mb-[52px] max-w-[560px] w-full flex flex-col gap-y-3 sm:justify-center sm:items-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Shipping Details
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94] sm:text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-[560px] w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-6">
          {/* Input components */}
          <Input name="fullName" label="Full Name" placeholder="Name" type="text" value={formData.fullName} onChange={handleInputChange} />
          <Input name="streetName" label="Street Name" placeholder="Street Name" type="text" value={formData.streetName} onChange={handleInputChange} />
          <div className="w-full flex flex-row gap-x-4 gap-y-6 sm:gap-y-0">
            <Input name="houseNumber" label="House Number" placeholder="House Number" type="text" value={formData.houseNumber} onChange={handleInputChange} />
            <Input name="city" label="City" placeholder="City" type="text" value={formData.city} onChange={handleInputChange} />
          </div>
          <Input name="phone" label="Phone" placeholder="Phone" type="tel" value={formData.phone} onChange={handleInputChange} />
          <div className="w-full flex flex-row gap-x-4 gap-y-6 sm:gap-y-0">
            <Input name="country" label="Country" placeholder="Country" type="text" value={formData.country} onChange={handleInputChange} />
            <Input name="zipCode" label="ZIP Code" placeholder="ZIP Code" type="number" value={formData.zipCode} onChange={handleInputChange} />
          </div>

          {/* Submit button */}
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-[42px] sm:mt-[52px] w-full text-base px-6 py-[17px] rounded-[30px] border-[1px] bg-[#070707] border-[#070707] text-[#FFFFFF] font-bold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const currentUser = require("@/lib/server/currentUser").default;
  const user = await currentUser(req);

  return {
    props: {
      email: user.email || null,
    },
  };
}

export default Shipping;
