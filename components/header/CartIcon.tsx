"use client";
import useCartStore from "@/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartIcon = () => {
  const { getTotalItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getTotalItemCount() : 0;

  return (
    <Link href={"/cart"} className="flex items-center gap-2.5 justify-end group">
      <span className="relative">
        <ShoppingCart className="text-tech_white w-5 h-6 lg:w-6 lg:h-6 group-hover:text-tech_yellow hoverEffected" />
        {mounted && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-tech_yellow text-tech_black h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </span>
      <div className="hidden lg:flex flex-col">
        <h4 className="text-base font-bold text-tech_white">Cart</h4>
        <p className="text-sm whitespace-nowrap capitalize">View Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;


