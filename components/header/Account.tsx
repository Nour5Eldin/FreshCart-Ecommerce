"use client";
import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Account = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
  
    return (
      <Link
        href="/sign-in"
        className="hidden  lg:flex items-center gap-2.5 justify-end group"
      >
        <User className="w-6 h-6 text-tech_yellow group-hover:text-tech_white hoverEffect" />
        <div className="hidden lg:flex flex-col">
          <h4 className="text-base font-bold text-tech_white">Account</h4>
          <p className="text-sm whitespace-nowrap">Login / Register</p>
        </div>
      </Link>
    );
  }

  // لو المستخدم مسجل دخول
  return (
    <Link
      href="/account/account"
      className="hidden lg:flex items-center gap-2.5 justify-end group"
    >
      <Image
        src={user?.imageUrl || "/default-avatar.png"}
        alt="User Avatar"
        width={60}
        height={60}
        className="rounded-full border-2 border-tech_yellow hover:scale-105 transition"
      />
    </Link>
  );
};

export default Account;




