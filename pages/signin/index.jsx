/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { parse } from "cookie";
import { Eye, EyeOff } from "lucide-react";

const importScript = (src) => {
  const credScript = document.createElement("script");
  credScript.type = "text/javascript";
  credScript.innerHTML = `
    window.handleCredentialResponse = async (response) => {
        try {
            const data = JSON.stringify({ data: response });
            const result = await fetch('/api/addSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });

            if (result.ok) {
                window.location.href = '/profile';
            } else {
                // Handle authentication error
                console.error('Authentication failed');
                alert('Authentication failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('An error occurred. Please try again.');
        }
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
    <div className="w-full flex flex-col gap-y-2">
      <label className="text-xl sm:text-2xl leading-6 capitalize font-normal text-[#070707]">
        {label}
      </label>
      <div className="w-full text-base px-3 sm:px-4 py-2.5 sm:py-3 leading-[25.6px] rounded-[84px] border-[1px] border-[#070707] text-[#070707] bg-[#FFFFFF] font-medium flex gap-3 sm:gap-5 justify-between">
        <input
          className="w-full h-fit text-sm sm:text-base focus:outline-none"
          placeholder={placeholder}
          type={type === "password" && isVisible ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const Signin = () => {
  useEffect(() => {
    importScript("https://accounts.google.com/gsi/client");
  }, []);

  const [buttonText, setButtonText] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setButtonText("Logging In...");
    e.preventDefault();
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);

    try {
      const response = await fetch("/api/pwdLogin", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.status === 200) {
        window.location.href = "/profile";
      } else {
        setButtonText("Log in");
      }
    } catch (error) {
      setButtonText("Log In");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="px-4 sm:px-0 pt-16 sm:pt-[80px] mt-8 sm:mt-[55px] mb-8 sm:mb-[41px] lg:mb-[152px] lg:pl-[70px] w-full flex flex-col lg:flex-row lg:gap-[57px] xl:gap-x-[152px] justify-center lg:justify-start items-start overflow-x-hidden">
      {/* Left Section with Text */}
      <div className="mb-8 sm:mb-[46px] lg:mb-0 w-full lg:w-[560px] px-0 sm:px-[50px] lg:px-0 flex flex-col justify-center items-start">
        {/* Title */}
        <div className="w-full flex flex-col gap-y-2 sm:gap-y-3">
          <p className="text-2xl sm:text-[32px] leading-8 font-normal capitalize text-[#070707]">
            Welcome back
          </p>
          <p className="w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
          A portal to your green world with orders, learning guides and complete profile dashboard with a simple sign in..
          </p>
        </div>

        {/* Google and Apple Authentication */}
        <div className="mt-8 sm:mt-[52px] w-full flex flex-col justify-center sm:flex-row gap-y-4 sm:gap-x-4">
          <div
            id="g_id_onload"
            data-client_id="39593396169-ppn7dc7v4huovmuromku2k01s26kngfa.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false"
          ></div>

          <div
            className="g_id_signin w-full sm:w-[380px] md:w-[400px] lg:w-[400px]"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="center"
            
            
          ></div>
        </div>

        {/* Or */}
        <div className="my-6 sm:my-8 w-full sm:w-[560px] flex gap-x-2 items-center">
          <div className="w-full h-[1px] bg-[#E4E4E4]" />
          <p className="text-sm sm:text-base leading-[25.6px] font-medium text-[#070707] whitespace-nowrap px-2">
            or
          </p>
          <div className="w-full h-[1px] bg-[#E4E4E4]" />
        </div>

        {/* Form */}
        <div className="w-full">
          <form
            className="w-full flex flex-col gap-y-4 sm:gap-y-6"
            onSubmit={handleSubmit}
          >
            <Input
              label="Email"
              placeholder="Type here"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              placeholder="Type here"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="mt-8 sm:mt-[52px] w-full text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-[17px] rounded-[30px] border-[1px] bg-[#070707] border-[#070707] text-[#FFFFFF] font-[600]"
            >
              {buttonText}
            </button>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-[18.2px] text-[#8E8F94] font-medium text-center">
              Don't have an account?
              <Link href="/signup">
                <span className="text-[#070707]"> Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="flex justify-center items-center w-full md:w-[560px] lg:w-[710px]">
        <div className="w-full h-[280px] sm:w-[330.65px] sm:h-[340px] md:w-[410px] md:h-[440px] lg:w-[558.65px] lg:h-[582px] xl:w-[725.65px] xl:h-[590px] overflow-hidden  shadow-lg rounded-lg">
          <video
            className="w-full h-full object-cover rounded-lg"
            src="/vid221.mov"
            playsInline
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { db } = await import("/pages/api/firebaseAdmin");
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokens = parse(cookies);
    const sessionToken = tokens.sessionToken;
    if (sessionToken) {
      const usersRef = db.collection("users");
      const querySnapshot = await usersRef
        .where("sessionToken", "==", sessionToken)
        .get();

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      const user = users[0];
      if (user) {
        return {
          redirect: {
            destination: "/profile",
            permanent: false,
          },
        };
      }
    } else {
      return {
        props: { user: null },
      };
    }
  }
  return {
    props: { user: null },
  };
}

export default Signin;
