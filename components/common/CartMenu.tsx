"use client";

import { BarChart2, Heart, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useCartStore from "@/store";

type ActiveIcon = "cart" | "wishlist" | "compare";

const CartMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<ActiveIcon>("cart");

  const cartCount = useCartStore((state) => state.getTotalItemCount());
  const wishlistCount = useCartStore((state) => state.favoriteProduct.length);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickIcon = (icon: ActiveIcon) => {
    setActiveIcon(icon);
    setIsOpen(false); // اغلاق القائمة بعد اختيار أي أيقونة
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">

      {/* القائمة الداخلية */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2 mb-2"
          >
            {/* Cart */}
            <Link href="/cart" onClick={() => handleClickIcon("cart")}>
              <div className="relative bg-tech_dark text-tech_white p-3 rounded-full shadow-lg hover:bg-tech_blue hoverEffect group">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-tech_yellow text-tech_dark text-xs w-5 h-5 flex items-center justify-center rounded-full hoverEffect">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" onClick={() => handleClickIcon("wishlist")}>
              <div className="relative bg-tech_dark text-white p-3 rounded-full shadow-lg hover:bg-tech_blue hoverEffect flex items-center justify-center">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Compare */}
            <Link href="/compare" onClick={() => handleClickIcon("compare")}>
              <div className="bg-tech_dark text-white p-3 rounded-full shadow-lg hover:bg-tech_blue hoverEffect">
                <BarChart2 size={20} />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الزر الرئيسي دايمًا تحت */}
      <button
        onClick={toggleMenu}
        className="relative bg-tech_blue text-tech_white p-3 rounded-full shadow-lg hover:bg-tech_dark hoverEffect group"
      >
        {isOpen ? (
          <X size={20} /> // X عند فتح القائمة، بدون أي عدادات
        ) : (
          <>
            {activeIcon === "cart" && <ShoppingCart size={20} />}
            {activeIcon === "wishlist" && <Heart size={20} />}
            {activeIcon === "compare" && <BarChart2 size={20} />}
          </>
        )}
      </button>
    </div>
  );
};

export default CartMenu;



