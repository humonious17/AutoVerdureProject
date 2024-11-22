/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const importScript = (src) => {
  const credScript = document.createElement("script");
  credScript.type = "text/javascript";
  credScript.innerHTML = `
    window.handleCredentialResponse = async (response) => {
        const data = JSON.stringify({data: response});
        await fetch('/api/addSession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        window.location.href = '/checkout/shipping';
    }
  `;
  document.head.appendChild(credScript);

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
};

const Input = ({ label, placeholder, type, name, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-2 md:gap-y-3">
      <label className="text-lg md:text-2xl leading-6 capitalize font-normal text-[#070707]">
        {label}
      </label>
      <div className="w-full relative">
        <input
          className="w-full text-base px-4 py-3 md:py-3.5 leading-[25.6px] rounded-[84px] border-[1px] border-[#070707] text-[#070707] bg-[#FFFFFF] font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all"
          placeholder={placeholder}
          type={isVisible ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <Image
              className="cursor-pointer transition-opacity hover:opacity-80"
              src="/eye.svg"
              alt="toggle password visibility"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
};

const GuestCheckout = (props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { query } = router;
  const isBuyNow = Boolean(query.productId);

  useEffect(() => {
    importScript("https://accounts.google.com/gsi/client");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "") {
      setError("Please enter your email");
      return;
    }
    setError(false);
    localStorage.setItem("userEmail", formData.email);

    if (isBuyNow) {
      router.push({
        pathname: "/checkout/shipping",
        query: { ...query, email: formData.email, buyNow: true },
      });
    } else {
      router.push("/checkout/shipping");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col justify-start items-center px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="w-full max-w-[560px] space-y-6 md:space-y-8">
        {/* Header Section */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-2xl md:text-[32px] leading-tight font-normal text-[#070707]">
            Welcome back
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[#8E8F94] font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Google Authentication */}
        <div className="w-full flex flex-col items-center justify-center pt-4 md:pt-6">
          <div
            id="g_id_onload"
            data-client_id="39593396169-ppn7dc7v4huovmuromku2k01s26kngfa.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false"
          ></div>

          <div
            className="g_id_signin w-full"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="center"
            data-width="400"
          ></div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2 md:py-4">
          <div className="flex-1 h-[1px] bg-[#E4E4E4]" />
          <span className="text-sm md:text-base font-medium text-[#070707]">
            or
          </span>
          <div className="flex-1 h-[1px] bg-[#E4E4E4]" />
        </div>

        {/* Guest Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <Input
            label="Continue as guest"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-600 text-sm md:text-base px-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full text-base px-6 py-3.5 md:py-4 rounded-[30px] bg-[#070707] text-white font-semibold transform transition-all hover:bg-[#222] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
          >
            Continue To Shipping
          </button>

          <div className="text-center pt-2">
            <p className="text-sm md:text-base text-[#8E8F94] font-medium">
              Don't have an account?{" "}
              <Link
                href="/cart/checkout/signup"
                className="text-[#070707] font-semibold hover:underline transition-all"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestCheckout;
