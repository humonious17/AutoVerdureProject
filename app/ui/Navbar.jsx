"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use this import for `useRouter` in the app directory
import React, { useState } from "react";
import { navItems } from "../constant/data";
import { usePathname } from "next/navigation";
import { PiLineVerticalLight } from "react-icons/pi";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  
  const router = useRouter();

  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchText);
  };

 

  const handleSignOut = () => {
    setShowLogoutModal(true); // Show confirmation modal
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
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

  return (
    <div
      className="w-full px-4 py-[19px] md:pl-[51px] md:pr-[27.53px] xl:pl-[77.34px] xl:pr-[77.34px] bg-transparent z-10 flex justify-between items-center absolute top-0"
      style={{ paddingLeft: "40px", paddingRight: "40px" }}
    >
      {/* Logo and Company Name */}
      <Link
        href="/"
        className="gap-[10px] no-underline text-black flex justify-center items-center"
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

      {/* Hamburger Icon */}
      <div className="xl:hidden w-[32px] h-[32px] object-contain cursor-pointer">
        <Image src="/hamburger.svg" alt="hamburger" width={32} height={32} />
      </div>

      {/* Nav Items */}
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
              <div
                className={
                  item.title === "contact" ? "flex hover:font-bold" : "hidden"
                }
              >
                <Image
                  src="/downArrow.svg"
                  alt="downArrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* Search Bar, Cart, User Avatar */}
      <div className="hidden xl:flex gap-[15px] items-center">
        {/* Search Bar */}
        <form
          className="relative flex items-center w-full"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="search"
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white border-2 border-gray-300 rounded-full px-6 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
            placeholder="Search"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Line */}
          <PiLineVerticalLight
            size={48}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400"
          />

          {/* Clear button */}
          {searchText && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-700"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          {/* Search Icon */}
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5 text-gray-400"
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

        {/* Cart and Profile Icons */}
        <div className="gap-4 flex justify-center items-center">
          <Link href="/cart" className="w-[24.53px] h-[24.53px]">
            <Image
              className="object-contain"
              src="/cart.svg"
              alt="cart"
              width={24.53}
              height={24.53}
            />
          </Link>
          <Link href="/profile" className="w-[24.53px] h-[24.53px]">
            <Image
              className="object-contain"
              src="/avatar.svg"
              alt="profile"
              width={24.53}
              height={24.53}
            />
          </Link>
          
        </div>

       
      </div>
    </div>
  );
};

export default Navbar;
