"use client";

import React from "react";
import { adminNavItems } from "../constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const pathname = usePathname().split("/").pop();
  return (
    <div className="pt-20 md:pt-[124px] xl:pt-[105px] w-full flex flex-col justify-center items-center bg-[#FFFCF8]">
      <div className="text-4xl md:text-[70px] leading-[48px] md:leading-[80px] -tracking-[1px] md:-tracking-[1.75px] text-primaryGrayscale text-center font-normal">
        <Link href="/admin" passHref>
        <p>Admin</p>
        </Link>
      </div>

      <div className="my-5 md:mt-6 md:mb-[40px] text-base text-secondaryGrayscale font-medium capitalize">
        <p>
          <Link href="/">
            <span className="text-primaryMain">Home</span>
          </Link>{" "}
          / {pathname}
        </p>
      </div>

      <div className="mt-5 flex gap-2 justify-center items-center">
        {adminNavItems.map((item, index) => (
          <Link
            href={item.url}
            className={
              pathname === item.title
                ? "text-xs md:text-base font-medium px-[14px] py-[10px] md:px-8 md:py-4 capitalize rounded-[100px] border-[1px] border-primaryMain bg-transparent text-primaryMain"
                : "text-xs md:text-base font-medium px-[14px] py-[10px] md:px-8 md:py-4 capitalize rounded-[100px] border-[1px] border-[#F5F5F5] hover:border-primaryMain bg-[#F5F5F5] text-secondaryGrayscale"
            }
            key={index}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminNavbar;
