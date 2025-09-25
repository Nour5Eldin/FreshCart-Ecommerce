"use client";
import useCartStore from "@/store";
import Link from "next/link";
import OrderAnimation from "./OrderAnimation";

export default function OrderSuccessPage() {
  const resetCart = useCartStore((state) => state.resetCart);

  return (
<div className="flex flex-col items-center justify-center h-screen">
  {/* الانيميشن */}
  <div className="w-40 h-40 flex items-center justify-center">
    <OrderAnimation />
  </div>

  {/* العنوان والنص */}
  <div className="text-center">
    <h1 className="text-2xl font-bold">Order Completed!</h1>
    <p className="text-gray-600">Thank you for your purchase 🎉</p>
  </div>

  {/* الزر */}
  <Link href="/">
    <button
      onClick={resetCart}
      className="bg-tech_blue text-white px-8 py-2 rounded-lg shadow-md hover:bg-tech_blue/80 transition"
    >
      Continue Shopping
    </button>
  </Link>
</div>
  );
}
