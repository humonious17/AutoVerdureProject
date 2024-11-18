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
  const mobileMenuRef = useRef(null); // Reference to mobile menu for detecting clicks outside

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

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false); // Close the menu if clicked outside
      }
    };

    
  }, [isMobileMenuOpen]);

  return (
    <div
      className="w-full px-4 py-[19px] md:pl-[51px] md:pr-[27.53px] xl:pl-[77.34px] xl:pr-[77.34px] bg-transparent z-10 flex justify-between items-center absolute top-0"
      style={{ paddingLeft: "40px", paddingRight: "40px" }}
    >
      {/* Logo and Company Name */}
      <Link
        href="/"
        className="gap-[10px] no-underline text-black flex justify-center items-center z-50"
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
  className="xl:hidden w-[32px] h-[32px] object-contain cursor-pointer flex items-center justify-center"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
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
    <Image
      src="/hamburger.svg" // Hamburger icon file
      alt="open menu"
      width={32}
      height={32}
    />
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
                className={item.title === pathname ? "font-bold capitalize" : "font-normal hover:font-bold capitalize"}
              >
                {item.title}
              </li>
              {item.title === "contact" && (
                <div className="flex hover:font-bold">
                  <Image src="/downArrow.svg" alt="downArrow" width={16} height={16} />
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
    className="xl:hidden absolute top-full right-0 bg-white p-4 z-60 flex flex-col items-center w-[50%] max-w-[120px] shadow-md border rounded-3xl"
    style={{ transform: "translateX(0)" }}
  >
    <ul className="flex flex-col items-left gap-4">
      {navItems.map((item, index) => (
        <li
          key={index}
          className={item.title === pathname ? "font-bold capitalize" : "font-normal hover:font-bold capitalize"}
        >
          <Link href={item.url} className="text-black no-underline">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>

    {/* Cart and Profile Options */}
    <div className="flex gap-4 mt-4">
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
)}

      {/* Search Bar, Cart, User Avatar (Desktop) */}
      <div className="hidden xl:flex gap-[15px] items-center">
        {/* Search Bar (Desktop) */}
        <form
          className="relative flex items-center"
          onSubmit={handleSearch}
          style={{ marginLeft: "-40px" }} // Shifts the search bar to overlap the line
        >
          <input
            type="text"
            name="search"
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white border border-gray-300 rounded-full px-6 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-600 w-[300px]" // Adjusted width
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
