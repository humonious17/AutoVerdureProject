/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { parse } from "cookie";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Head from "next/head";

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

const Input = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  icon: Icon,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon
            className={`h-5 w-5 ${
              isFocused ? "text-primaryMain" : "text-gray-400"
            }`}
          />
        </div>
        <input
          className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-300 rounded-full transition-colors focus:outline-none focus:border-primaryMain focus:ring-1 focus:ring-primaryMain"
          placeholder={placeholder}
          type={type === "password" && isVisible ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <EyeOff
                className={`h-5 w-5 ${
                  isFocused ? "text-primaryMain" : "text-gray-400"
                }`}
              />
            ) : (
              <Eye
                className={`h-5 w-5 ${
                  isFocused ? "text-primaryMain" : "text-gray-400"
                }`}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const Signin = () => {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [buttonText, setButtonText] = useState("Sign In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Initialize Google Sign-In
  useEffect(() => {
    // Only initialize if not already loaded
    if (!isGoogleLoaded) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id:
            "39593396169-ppn7dc7v4huovmuromku2k01s26kngfa.apps.googleusercontent.com",
          callback: handleGoogleCallback,
        });
        setIsGoogleLoaded(true);
      };

      document.head.appendChild(script);
    }
  }, [isGoogleLoaded]);

  const handleGoogleCallback = async (response) => {
    try {
      const result = await fetch("/api/addSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: response }),
      });

      if (result.ok) {
        window.location.href = "/profile";
      } else {
        console.error("Authentication failed");
        alert("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMicrosoftLogin = () => {
    window.location.href = "/api/auth/microsoft";
  };

  const handleGoogleLogin = () => {
    if (!isGoogleLoaded) {
      console.log("Google Sign-In is not yet initialized");
      return;
    }

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Only render button if prompt fails
          window.google.accounts.id.renderButton(
            document.getElementById("google-signin-button"),
            { theme: "outline", size: "large" }
          );
        }
      });
    } catch (error) {
      console.error("Error triggering Google Sign-In:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Signing in...");
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
        setButtonText("Sign In");
      }
    } catch (error) {
      setButtonText("Sign In");
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.google?.accounts?.id?.initialize({
        client_id:
          "39593396169-ppn7dc7v4huovmuromku2k01s26kngfa.apps.googleusercontent.com",
        callback: window.handleCredentialResponse,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>

      <div className="px-4 sm:px-0 pt-16 sm:pt-[80px] mt-8 sm:mt-[55px] mb-8 sm:mb-[41px] lg:mb-[152px] lg:pl-[70px] w-full flex flex-col lg:flex-row lg:gap-[57px] xl:gap-x-[152px] justify-center lg:justify-start items-start overflow-x-hidden">
        {/* Left Section - Form */}
        <div className="mb-8 sm:mb-[46px] lg:mb-0 w-full lg:w-[560px] px-0 sm:px-[50px] lg:px-0 flex flex-col justify-center items-start">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-medium text-gray-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to track your orders, access tailored guides, and manage
                your profile.
              </p>
            </div>

            <div className="mt-8 sm:mt-[52px] w-full flex flex-col items-center justify-center gap-y-4">
              {/* Custom Google Authentication Button */}
              <button
                id="google-signin-button"
                onClick={handleGoogleLogin}
                className="w-full h-[38px] flex items-center justify-center gap-3 px-6 border border-gray-300 rounded-[30px] bg-white hover:bg-gray-50 transition-colors text-[#3C4043] text-[14px] font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </button>

              {/* Microsoft Authentication Button */}
              <button
                onClick={handleMicrosoftLogin}
                className="w-full h-[38px] flex items-center justify-center gap-3 px-6 border border-gray-300 rounded-[30px] bg-white hover:bg-gray-50 transition-colors text-[#3C4043] text-[14px] font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
                  <path d="M10 0H0v10h10V0z" fill="#F25022" />
                  <path d="M21 0H11v10h10V0z" fill="#7FBA00" />
                  <path d="M10 11H0v10h10V11z" fill="#00A4EF" />
                  <path d="M21 11H11v10h10V11z" fill="#FFB900" />
                </svg>
                <span>Sign In with Microsoft</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#fffbf7] text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
              />

              <Input
                label="Password"
                placeholder="••••••••"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
              />

              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors"
              >
                {buttonText}
              </button>
            </form>

            <p className="text-center text-sm text-[#8E8F94]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-black hover:text-primaryMain"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="flex justify-center items-center w-full md:w-[800px] lg:w-[710px]">
          <div className="w-full h-[280px] sm:w-[430.65px] sm:h-[340px] md:w-[660px] md:h-[440px] lg:w-[558.65px] lg:h-[582px] xl:w-[725.65px] xl:h-[590px] overflow-hidden shadow-lg rounded-lg">
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
    </>
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
    }
  }
  return {
    props: { user: null },
  };
}

export default Signin;
