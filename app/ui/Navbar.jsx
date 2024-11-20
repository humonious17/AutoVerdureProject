"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { navItems } from "../constant/data";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const router = useRouter();

  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchText);
  };

  let pathname = usePathname();
  if (pathname) {
    pathname = pathname.split("/").pop();
  } else {
    pathname = "";
  }

  if (pathname === "about-us") {
    pathname = "about us";
  } else if (pathname === "") {
    pathname = "home";
  }

  // Handle scroll and navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        hamburgerRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        handleMobileMenuToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMobileMenuToggle = () => {
    if (isMobileMenuAnimating) return;

    setIsMobileMenuAnimating(true);
    if (isMobileMenuOpen) {
      // Slide out animation
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        setIsMobileMenuAnimating(false);
      }, 300);
    } else {
      // Slide in animation
      setIsMobileMenuOpen(true);
      setTimeout(() => {
        setIsMobileMenuAnimating(false);
      }, 300);
    }
  };

  return (
    <div
      className={`
    w-full 
    px-4 md:px-[51px] xl:px-[77.34px] 
    py-[19px] 
    z-50 
    flex 
    justify-between 
    items-center 
    fixed 
    top-0 
    transition-all 
    duration-50 
    ease-in-out 
    ${
      isScrolled
        ? "bg-white/95 backdrop-blur-sm shadow-lg text-black"
        : "bg-transparent text-black"
    }
  `}
      style={{
        paddingLeft: "40px",
        paddingRight: "40px",
        WebkitBackdropFilter: "blur(8px)", // For Safari support
        transition:
          "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out",
      }}
    >
      {/* Logo and Company Name */}
      <Link
        href="/"
        className="gap-[10px] no-underline text-inherit flex justify-center items-center z-50"
      >
        <div className="object-contain w-[48.475px] h-[44px]">
          <Image
            src="/logoHD.png"
            alt="logo"
            width={48.475}
            height={44}
            unoptimized={true}
            priority
          />
        </div>
        <p className="text-sm leading-[28.8px] fontText uppercase text-center font-medium">
          Auto Verdure
        </p>
      </Link>

      {/* Hamburger Icon (Mobile) */}
      <div
        ref={hamburgerRef}
        className="xl:hidden w-[32px] h-[32px] object-contain cursor-pointer flex items-center justify-center z-50"
        onClick={handleMobileMenuToggle}
      >
        {isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <Image src="/hamburger.svg" alt="open menu" width={32} height={32} />
        )}
      </div>

      {/* Nav Items (Desktop) */}
      <div className="hidden xl:block" style={{ marginLeft: "90px" }}>
        <ul className="gap-16 flex justify-center items-center">
          {navItems.map((item, index) => (
            <Link
              className="text-sm gap-1 flex justify-center items-center text-primaryGrayscale no-underline list-none font-normal leading-6"
              key={index}
              href={item.url}
            >
              <li
                className={
                  item.title === pathname
                    ? "font-bold capitalize"
                    : "font-normal hover:font-bold capitalize"
                }
              >
                {item.title}
              </li>
              {item.title === "contact" && (
                <div className="flex hover:font-bold">
                  <Image
                    src="/downArrow.svg"
                    alt="downArrow"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </Link>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`
          xl:hidden 
          fixed 
          top-0 
          right-0 
          left-0 
          h-screen 
          bg-white/90 
          backdrop-blur-sm 
          z-40 
          pt-[100px] 
          px-6 
          transition-all 
          duration-150 
          ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
          style={{
            pointerEvents: isMobileMenuOpen ? "auto" : "none",
          }}
        >
          <ul className="flex flex-col items-center gap-6 w-full">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`
                w-full 
                text-center 
                py-2 
                transform 
                transition-all 
                duration-300 
                ease-in-out
                ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100 delay-[100ms]"
                    : "translate-x-10 opacity-0"
                } 
                ${
                  item.title === pathname
                    ? "font-bold text-black"
                    : "font-normal text-gray-700 hover:text-black"
                }
              `}
                onClick={() => handleMobileMenuToggle()}
              >
                <Link href={item.url} className="block w-full no-underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart and Profile Options */}
          <div
            className={`
            flex 
            justify-center 
            gap-8 
            mt-8 
            transform 
            transition-all 
            duration-300 
            ease-in-out
            ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100 delay-[200ms]"
                : "translate-x-10 opacity-0"
            }
          `}
          >
            <Link
              href="/cart"
              className="w-[36px] h-[36px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                className="object-contain"
                src="/cart.svg"
                alt="cart"
                width={36}
                height={36}
              />
            </Link>
            <Link
              href="/profile"
              className="w-[36px] h-[36px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                className="object-contain"
                src="/avatar.svg"
                alt="profile"
                width={36}
                height={36}
              />
            </Link>
          </div>

          {/* Search Bar for Mobile */}
          <form
            className={`
            mt-8 
            w-full 
            max-w-md 
            mx-auto 
            transform 
            transition-all 
            duration-300 
            ease-in-out
            ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100 delay-[300ms]"
                : "translate-x-10 opacity-0"
            }
          `}
            onSubmit={handleSearch}
          >
            <div className="relative">
              <input
                type="text"
                name="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar, Cart, User Avatar (Desktop) */}
      <div className="hidden xl:flex gap-[15px] items-center">
        {/* Search Bar (Desktop) */}
        <form
          className="relative flex items-center"
          onSubmit={handleSearch}
          style={{ marginLeft: "-40px" }}
        >
          <input
            type="text"
            name="search"
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white border border-gray-300 rounded-full px-6 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-600 w-[300px]"
            placeholder="Search"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Vertical Line */}
          <span
            className="absolute top-1/2 right-[50px] transform -translate-y-1/2 bg-gray-300"
            style={{
              width: "1px",
              height: "100%",
              right: searchText ? "56px" : "38px",
            }}
          ></span>

          {/* Clear button */}
          {searchText && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-[38px] top-1/2 transform -translate-y-1/2 text-gray-700"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          {/* Search Icon */}
          <button
            type="submit"
            className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>
        </form>

        {/* Icons (Cart and Avatar) */}
        <div className="flex gap-4 items-center">
          <Link href="/cart" className="w-[24px] h-[24px]">
            <Image
              className="object-contain"
              src="/cart.svg"
              alt="cart"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/profile" className="w-[24px] h-[24px]">
            <Image
              className="object-contain"
              src="/avatar.svg"
              alt="profile"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
