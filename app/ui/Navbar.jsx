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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(-1);

  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchSuggestionsRef = useRef(null);

  const router = useRouter();

  let pathname = usePathname();
  pathname = pathname ? pathname.split("/").pop() : "";
  pathname =
    pathname === "about-us" ? "about us" : pathname === "" ? "home" : pathname;

  // Enhanced search handling with local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveSearchToHistory = (search) => {
    const updatedHistory = [
      search,
      ...searchHistory.filter((item) => item !== search),
    ].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleClear = () => {
    setSearchText("");
    searchInputRef.current?.focus();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    saveSearchToHistory(searchText);

    // Add ripple effect to search button
    const button = e.currentTarget.querySelector('button[type="submit"]');
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - button.offsetTop - diameter / 2}px`;
    circle.classList.add("ripple");
    button.appendChild(circle);

    // Animate search input
    if (searchInputRef.current) {
      searchInputRef.current.classList.add("search-pulse");
      setTimeout(() => {
        searchInputRef.current?.classList.remove("search-pulse");
        circle.remove();
      }, 1000);
    }

    console.log("Searching for:", searchText);
    setShowSearchSuggestions(false);
  };

  // Enhanced scroll handling with dynamic threshold
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const scrollDelta = currentScrollTop - lastScrollTop;
      const scrollThreshold = 50;

      // Update scroll state
      setIsScrolled(currentScrollTop > scrollThreshold);

      // Dynamic navbar visibility based on scroll speed and direction
      if (Math.abs(scrollDelta) > 20) {
        // Only trigger for significant scroll amounts
        if (scrollDelta > 0 && currentScrollTop > 100) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Set new timeout to show navbar after user stops scrolling
      scrollTimeout = setTimeout(() => {
        setIsNavVisible(true);
      }, 1000);

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollTop]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Search focus shortcut
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      // Escape handling
      if (e.key === "Escape") {
        if (showSearchSuggestions) {
          setShowSearchSuggestions(false);
        } else if (isMobileMenuOpen) {
          handleMobileMenuToggle();
        }
      }

      // Arrow key navigation for search suggestions
      if (showSearchSuggestions) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveNavIndex((prev) =>
            prev < searchHistory.length - 1 ? prev + 1 : -1
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveNavIndex((prev) =>
            prev > -1 ? prev - 1 : searchHistory.length - 1
          );
        } else if (e.key === "Enter" && activeNavIndex !== -1) {
          e.preventDefault();
          setSearchText(searchHistory[activeNavIndex]);
          setShowSearchSuggestions(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isMobileMenuOpen, showSearchSuggestions, searchHistory, activeNavIndex]);

  // Click outside handling for search suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchSuggestionsRef.current &&
        !searchSuggestionsRef.current.contains(e.target) &&
        !searchInputRef.current?.contains(e.target)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced mobile menu toggle with spring animation
  const handleMobileMenuToggle = () => {
    if (isMobileMenuAnimating) return;

    setIsMobileMenuAnimating(true);

    // Add spring animation class
    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.add(
        isMobileMenuOpen ? "slide-out-spring" : "slide-in-spring"
      );
    }

    // Toggle body scroll
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";

    // Update menu state with animation
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Reset animation state
    setTimeout(() => {
      setIsMobileMenuAnimating(false);
      if (mobileMenuRef.current) {
        mobileMenuRef.current.classList.remove(
          "slide-in-spring",
          "slide-out-spring"
        );
      }
    }, 400);
  };

  return (
    <div
      className={`
    w-full  // Change from w-screen to w-full
    px-4 md:px-[51px] xl:px-[77.34px] 
    py-[19px] 
    z-50 
    flex 
    justify-between 
    items-center 
    fixed 
    top-0 
    transition-all 
    duration-500
    ease-in-out 
    ${
      isScrolled
        ? "bg-[#fffbf7]/95 backdrop-blur-md shadow-md text-black"
        : "bg-transparent text-black"
    }
    ${isNavVisible ? "translate-y-0" : "-translate-y-full"}
    hover:shadow-md
  `}
      style={{
        paddingLeft: "40px",
        paddingRight: "40px",
        WebkitBackdropFilter: isScrolled ? "blur(8px)" : "none",
      }}
    >
      {/* Logo and Company Name with enhanced hover effect */}
      <Link
        href="/"
        className="gap-[10px] no-underline text-inherit flex justify-center items-center z-50 group"
        style={{ marginLeft: "0px" }} // Shift to the left
      >
        <div className="relative overflow-hidden w-[48.475px] h-[44px] transition-all duration-100 group-hover:scale-110">
          <Image
            src="/logoHD.png"
            alt="logo"
            width={48.475}
            height={44}
            unoptimized={true}
            priority
            className="transition-all duration-100 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-[#fffbf7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
        </div>
        <p className="text-sm leading-[28.8px] fontText uppercase text-center font-medium transition-all duration-100 group-hover:text-gray-600 group-hover:tracking-wider">
          Auto Verdure
        </p>
      </Link>

      {/* Enhanced Hamburger Icon with smooth animation */}
      <div
        ref={hamburgerRef}
        className="xl:hidden w-[32px] h-[32px] relative cursor-pointer flex items-center justify-center z-50 transition-transform duration-100 hover:scale-110"
        onClick={handleMobileMenuToggle}
        style={{ marginRight: "-25px", marginTop: "10px" }} // Shift to the right
      >
        <div
          className={`
            hamburger-icon 
            ${isMobileMenuOpen ? "open" : ""} 
            before:transition-all 
            before:duration-100 
            after:transition-all 
            after:duration-100
          `}
        >
          <span className="line transition-all duration-100" />
          <span
            className={`line transition-all duration-100 ${
              isMobileMenuOpen ? "text-[#fffbf7]" : "text-black"
            }`}
          />
          <span
            className={`line transition-all duration-100 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          />
        </div>
      </div>

      {/* Enhanced Nav Items (Desktop) with hover effects */}
      <div className="hidden xl:block" style={{ marginLeft: "90px" }}>
        <ul className="gap-16 flex justify-center items-center">
          {navItems.map((item, index) => (
            <Link
              className="text-sm gap-1 flex justify-center items-center text-primaryGrayscale no-underline list-none font-normal leading-6 group perspective"
              key={index}
              href={item.url}
            >
              <li
                className={`
                  relative 
                  ${item.title === pathname ? "font-bold" : "font-normal"}
                  capitalize
                  transition-all
                  duration-100
                  before:content-['']
                  before:absolute
                  before:-bottom-2
                  before:left-0
                  before:w-0
                  before:h-0.5
                  before:rounded-full
                  before:opacity-0
                  before:transition-all
                  before:duration-100
                  before:bg-gradient-to-r
                  before:from-black
                  before:to-gray-600
                  group-hover:before:w-full
                  group-hover:before:opacity-100
                  group-hover:transform
                  group-hover:translate-y-[-2px]
                `}
              >
                {item.title}
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-100 rounded-lg" />
              </li>
              {item.title === "contact"}
            </Link>
          ))}
        </ul>
      </div>

      {/* Enhanced Mobile Menu with spring animations */}
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
            bg-[#FFFBF7]/90 
            backdrop-blur-md 
            z-40 
            pt-[100px] 
            px-6 
            transition-all 
            duration-400 
            ease-spring
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
                  duration-100 
                  ease-spring
                  ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }
                  ${
                    item.title === pathname
                      ? "font-bold text-black"
                      : "font-normal text-gray-700"
                  }
                  hover:text-black
                  hover:scale-105
                `}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                onClick={() => handleMobileMenuToggle()}
              >
                <Link
                  href={item.url}
                  className="block w-full no-underline relative overflow-hidden group"
                >
                  <span className="relative z-10 transition-transform duration-100 group-hover:translate-y-[-2px] inline-block">
                    {item.title}
                  </span>
                  <span className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-100 origin-left rounded-lg" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Enhanced Mobile Search with animations */}
          <form
            className={`
              mt-8 
              w-full 
              max-w-md 
              mx-auto 
              transform 
              transition-all 
              duration-100 
              ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }
            `}
            style={{ transitionDelay: `${(navItems.length + 2) * 50}ms` }}
            onSubmit={handleSearch}
          >
            <div className="relative group">
              <input
                ref={searchInputRef}
                type="text"
                name="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                className="
                  w-full 
                  px-4 
                  py-2 
                  border 
                  border-gray-300 
                  rounded-full 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition-all 
                  duration-100
                  group-hover:shadow-md
                  placeholder:text-gray-400
                  placeholder:transition-opacity
                  focus:placeholder:opacity-75
                "
                placeholder="Search"
              />
              <button
                type="submit"
                className="
                  absolute 
                  right-2 
                  top-1/2 
                  -translate-y-1/2 
                  transition-all 
                  duration-100 
                  hover:scale-110
                  focus:outline-none
                  overflow-hidden
                "
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition-colors duration-100 hover:text-gray-700"
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

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && searchHistory.length > 0 && (
                <div
                  ref={searchSuggestionsRef}
                  className="
                    absolute 
                    top-full 
                    left-0 
                    right-0 
                    mt-2 
                    bg-[#FFFBF7] 
                    rounded-lg 
                    shadow-lg 
                    border 
                    border-gray-200 
                    overflow-hidden
                    z-50
                  "
                >
                  <ul className="py-2">
                    {searchHistory.map((item, index) => (
                      <li
                        key={index}
                        className={`
                          px-4 
                          py-2 
                          cursor-pointer 
                          transition-all 
                          duration-200
                          ${
                            activeNavIndex === index
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                          }
                        `}
                        onClick={() => {
                          setSearchText(item);
                          setShowSearchSuggestions(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>

          {/* Enhanced Mobile Menu Cart and Profile */}
          <div className="flex justify-center gap-8 mt-8">
            {["cart", "profile"].map((item, index) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`
                  relative
                  w-[36px] 
                  h-[36px] 
                  flex 
                  items-center 
                  justify-center 
                  transform 
                  transition-all 
                  duration-100 
                  hover:scale-110
                  group
                  ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${(navItems.length + index) * 50}ms`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  className="
                    object-contain 
                    transition-all 
                    duration-100 
                    group-hover:opacity-70
                    group-hover:transform
                    group-hover:translate-y-[-2px]
                  "
                  src={`/${item}.svg`}
                  alt={item}
                  width={36}
                  height={36}
                />
                <span
                  className="
                  absolute 
                  -bottom-6 
                  text-xs 
                  text-gray-500 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-all 
                  duration-100
                  capitalize
                "
                >
                  {item}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Desktop Search Bar and Icons */}
      <div className="hidden xl:flex gap-[15px] items-center">
        <form
          className="relative flex items-center"
          onSubmit={handleSearch}
          style={{ marginLeft: "-40px" }}
        >
          <input
            ref={searchInputRef}
            type="text"
            name="search"
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              setIsSearchFocused(true);
              setShowSearchSuggestions(true);
            }}
            className={`
              bg-[white] 
              border 
              border-gray-300 
              rounded-full 
              px-6 
              py-2 
              shadow-sm
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-600 
              transition-all 
              duration-100
              ease-out
              ${isSearchFocused ? "w-[350px] shadow-md" : "w-[300px]"}
              placeholder:text-gray-400
              placeholder:transition-opacity
              focus:placeholder:opacity-75
            `}
            placeholder="Search"
            autoComplete="off"
            spellCheck="false"
          />

          <div className="absolute right-3 flex items-center gap-2">
            {searchText && (
              <button
                type="button"
                onClick={handleClear}
                className="
                  text-gray-400 
                  hover:text-gray-600 
                  transition-all 
                  duration-100 
                  hover:scale-110
                  focus:outline-none
                "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="
                text-gray-400 
                hover:text-gray-600 
                transition-all 
                duration-100 
                hover:scale-110
                focus:outline-none
                relative
                overflow-hidden
              "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {/* Desktop Search Suggestions */}
          {showSearchSuggestions && searchHistory.length > 0 && (
            <div
              ref={searchSuggestionsRef}
              className="
                absolute 
                top-full 
                left-0 
                right-0 
                mt-2 
                bg-[#FFFBF7] 
                rounded-lg 
                shadow-lg 
                border 
                border-gray-200 
                overflow-hidden
                z-50
              "
            >
              <ul className="py-2">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className={`
                      px-4 
                      py-2 
                      cursor-pointer 
                      transition-all 
                      duration-200
                      ${
                        activeNavIndex === index
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }
                      flex
                      items-center
                      gap-2
                    `}
                    onClick={() => {
                      setSearchText(item);
                      setShowSearchSuggestions(false);
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* Enhanced Desktop Icons */}
        <div className="flex gap-4 items-center">
          {["cart", "profile"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="
                relative 
                w-[24px] 
                h-[24px] 
                group 
                transition-transform 
                duration-100 
                hover:scale-110
              "
            >
              <Image
                className="
                  object-contain 
                  transition-all 
                  duration-100 
                  group-hover:opacity-70
                  group-hover:transform
                  group-hover:translate-y-[-2px]
                "
                src={`/${item}.svg`}
                alt={item}
                width={24}
                height={24}
              />
              <span
                className="
                absolute 
                -bottom-5 
                left-1/2 
                -translate-x-1/2 
                text-xs 
                text-gray-500 
                opacity-0 
                group-hover:opacity-100 
                transition-all 
                duration-0
                whitespace-nowrap
                capitalize
              "
              >
                {item}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Add CSS keyframes for animations */}
      <style jsx global>{`
        /* Ripple effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Search pulse animation */
        .search-pulse {
          animation: search-pulse 500ms ease-out;
        }

        @keyframes search-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Hamburger menu animations */
        .hamburger-icon {
          position: relative;
          width: 24px;
          height: 20px;
        }

        .hamburger-icon .line {
          position: absolute;
          height: 2px;
          width: 100%;
          background: currentColor;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger-icon .line:nth-child(1) {
          top: 0;
        }

        .hamburger-icon .line:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        .hamburger-icon .line:nth-child(3) {
          bottom: 0;
        }

        .hamburger-icon.open .line:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .hamburger-icon.open .line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-icon.open .line:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        /* Mobile menu spring animations */
        .slide-in-spring {
          animation: slideInSpring 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        .slide-out-spring {
          animation: slideOutSpring 400ms cubic-bezier(0.6, -0.28, 0.735, 0.045)
            forwards;
        }

        @keyframes slideInSpring {
          0% {
            transform: translateX(100%);
          }
          70% {
            transform: translateX(-5%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes slideOutSpring {
          0% {
            transform: translateX(0);
          }
          30% {
            transform: translateX(-5%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Ease-spring timing function */
        .ease-spring {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default Navbar;
