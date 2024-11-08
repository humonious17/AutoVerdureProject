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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");  
  const router = useRouter();

  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchText);
  };

  const confirmLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session-based auth
      });

      if (!response.ok) throw new Error("Logout failed");

      // Clear tokens or user-related data
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("userSession");

      // Show success message
      setLogoutMessage("You have successfully logged out.");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        setLogoutMessage(""); // Clear the message
        router.push("/pwdLogin");
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Something went wrong while logging out.");
    }
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
          {/* Sign Out Button */}
          <button onClick={handleSignOut} className="flex items-center">
            <Image
              src="/signout.svg"
              alt="sign out"
              width={24.53}
              height={24.53}
            />
          </button>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-lg mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={closeLogoutModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Success Message */}
        {logoutMessage && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-3">
            {logoutMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
