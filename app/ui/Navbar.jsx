"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { navItems } from "../constant/data";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { PiLineVerticalLight } from "react-icons/pi";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearchBar = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const handleClear = () => {
    setSearchText("");
    setIsVisible(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
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

  return (
    <div className="w-full px-4 py-[19px] md:pl-[51px] md:pr-[27.53px] xl:pl-[77.34px] xl:pr-[77.34px] bg-transparent z-10 flex justify-between items-center absolute top-0" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      {/* Logo and Company Name */}
      <Link href="/" className="gap-[10px] no-underline text-black flex justify-center items-center">
        <div className="object-contain w-[48.475px] h-[44px]">
          <Image src="/logoHD.png" alt="logo" width={48.475} height={44} unoptimized={true} priority />
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
            <Link className="text-sm gap-1 flex justify-center items-center text-primaryGrayscale no-underline list-none font-normal leading-6" key={index} href={item.url}>
              <li className={item.title === pathname ? "font-bold capitalize" : "font-normal hover:font-bold capitalize"}>
                {item.title}
              </li>
              <div className={item.title === "contact" ? "flex hover:font-bold" : "hidden"}>
                <Image src="/downArrow.svg" alt="downArrow" width={16} height={16} />
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* Search Bar, Cart, User Avatar */}
      <div className="hidden xl:flex gap-[15px]">
        <div className="relative flex items-center justify-center w-full">
          <form className={`relative flex items-center transition-all duration-300 ease-out ${isVisible ? 'w-full' : 'w-10'}`} onSubmit={handleSearch}>
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="search"
                name="search"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`transition-all duration-300 ease-out bg-white border-2 border-gray-300 rounded-full px-1 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-600 ${isVisible ? 'scale-100 w-full' : 'scale-0 w-0'} pl-6 pr-6`}
                placeholder="Search"
                autoComplete="off"
                spellCheck="false"
                onBlur={() => setIsVisible(false)} // Hide search bar when it loses focus
              />
             
              {searchText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-700"
                  aria-label="Clear search"
                >
                  <CiSearch />

                </button>
              )}
              {/*Line*/}
              <button 
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <PiLineVerticalLight size={48} className="mx-2"/> </button>
              {/* Search Icon */}
              <button
                type="submit" // Use type="submit" to allow form submission
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                aria-label="Search"
              >
                  
           
                  <svg
          className="w-5 h-5 text-gray-400 "
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
            
            {/* Toggle Button */}
            <button
          type="submit"
          onClick={toggleSearchBar}
          className={`relative right-6 transition-all duration-300 ease-out bg-transparent flex items-center justify-center transform ${isVisible ? 'opacity-0' : 'opacity-100'}`}
        >
          <svg className="w-6 h-6 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <title>Search</title>
            <path d="M41.7,3.3C20.6,3.3,3.4,20,3.4,40.7s17.1,37.4,38.3,37.4c5.9,0,11.5-1.3,16.5-3.7c2.5-1.2,5.5-0.6,7.5,1.3l19.4,19c2.6,2.5,6.7,2.5,9.3,0l0,0c2.7-2.6,2.7-6.9,0-9.6L76.1,67.3c-2.2-2.1-2.7-5.5-1.1-8.1c3.2-5.4,5-11.7,5-18.4C80,20,62.9,3.3,41.7,3.3L41.7,3.3z M41.7,12.1C57.9,12.1,71,24.9,71,40.7S57.9,69.4,41.7,69.4S12.5,56.6,12.5,40.7S25.5,12.1,41.7,12.1L41.7,12.1z"></path>
          </svg>
        </button>
          </form>
        </div>

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
          <div className="w-[24.53px] h-[24.53px]">
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
    </div>
  );
};

export default Navbar;