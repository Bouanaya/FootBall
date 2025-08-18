import React from "react";
import Link from "next/link";
import { AiFillForward } from "react-icons/ai";

export default function Header() {
  return (
    <header className="bg-[#39353F] shadow-sm border-b fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-2  px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className=" font-bold text-white text-4xl">
            This<span className=" font-bold text-primary text-4xl">Logo</span>
          </span>
        </Link>

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-primary text-white px-4 py-2 rounded-sm "
        >
          <AiFillForward />
        </Link>
      </div>
    </header>
  );
}
