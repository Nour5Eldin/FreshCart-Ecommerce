"use client";
import React, { useState } from "react";
import { AlignLeft, X, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs"; 
import { usePathname } from "next/navigation"; 

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* زرار فتح القائمة */}
      <button
        onClick={toggleSidebar}
        className="hover:text-tech_yellow hoverEffected lg:hidden"
      >
        <AlignLeft />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-tech_blue text-white z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 flex flex-col`}
      >
        {/* close button */}
        <button
          onClick={closeSidebar}
          className="absolute top-5 right-5 text-white hover:text-tech_yellow"
        >
          <X className="w-7 h-7" />
        </button>

        {/* sidebar content */}
        <div className="flex items-center gap-3 mt-10 px-5">
          {isSignedIn ? (
            <>
              <Link href="/account/account" onClick={closeSidebar}>
                <Image
                  src={user?.imageUrl || "/placeholder.png"}
                  alt="avatar"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-tech_yellow cursor-pointer"
                />
              </Link>
              <div>
                <p className="text-sm text-gray-300">Welcome</p>
                <p className="font-bold text-tech_yellow">{user?.firstName}</p>
              </div>
            </>
          ) : (
            <Link href="/sign-in" onClick={closeSidebar}>
              <div className="flex items-center gap-3 cursor-pointer">
                <User className="w-14 h-14 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-300">Welcome</p>
                  <p className="font-bold text-tech_yellow">Sign in</p>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* خط فاصل */}
        <div className="border-b border-gray-500 my-4" />

        {/* القوائم */}
        <nav className="flex flex-col items-center gap-4 mt-6 text-lg font-medium">
          <Link
            href="/"
            onClick={closeSidebar}
            className={`${
              pathname === "/" ? "text-tech_yellow font-bold" : "hover:text-tech_yellow"
            }`}
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={closeSidebar}
            className={`${
              pathname === "/shop"
                ? "text-tech_yellow font-bold"
                : "hover:text-tech_yellow"
            }`}
          >
            Shop
          </Link>
          <Link
            href="/deal"
            onClick={closeSidebar}
            className={`${
              pathname === "/deal"
                ? "text-tech_yellow font-bold"
                : "hover:text-tech_yellow"
            }`}
          >
            TV Deal
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
