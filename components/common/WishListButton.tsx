"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import useCartStore from "@/store";
import toast from "react-hot-toast";

interface WishListButtonProps {
  product: Product;
}

const WishListButton: React.FC<WishListButtonProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useCartStore();

  const handleClick = () => {
    toggleFavorite(product);
    if (isFavorite(product._id)) {
      toast.success(`${product.name} added to favorites!`);
    } else {
      toast.error(`${product.name} removed from favorites!`);
    }
  };

  const active = isFavorite(product._id);

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors duration-200 ${
        active
          ? "bg-red-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
      }`}
    >
      <Heart fill={active ? "white" : "none"} stroke="currentColor" className="w-5 h-5" />
    </button>
  );
};

export default WishListButton;













