"use client";

import { storeNavItems } from "@/app/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StoreNavbar = () => {
  let pathname = usePathname().split("/").pop();

  if (pathname === "store") {
    pathname = "all";
  }

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto hide-scrollbar py-4">
          <div className="inline-flex gap-3 px-4 sm:px-6 min-w-full">
            {storeNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className={`
                  whitespace-nowrap
                  px-4 py-2
                  text-sm font-medium
                  rounded-full
                  transition-all
                  border-2
                  ${
                    pathname === item.title
                      ? "bg-primaryMain text-white"
                      : "bg-white text-gray-700 border-gray-20"
                  }
                `}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
