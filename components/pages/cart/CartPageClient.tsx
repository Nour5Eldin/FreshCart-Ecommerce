"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

import Container from "@/components/common/Container";
import PriceFormatter from "@/components/common/PriceFormatter";
import QuantityButtons from "@/components/common/QuantityButtons";
import EmptyCart from "./EmptyCart";
import useCartStore from "@/store";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowLeft, ShoppingBag, Trash } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Loading from "@/components/common/Loading";

const CartPageClient = () => {
   const [loading, setLoading] = useState(true);
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } =
    useCartStore();

  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // الوقت بالمللي ثانية، 1 ثانية هنا

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const handleResetCart = () => {
    if (window.confirm("Are you sure to reset your Cart?")) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    if (!groupedItems.length) return toast.error("Cart is empty!");

    try {
      setIsProcessing(true);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      const cartItems = groupedItems.map(({ product }) => ({
        id: product._id,
        name: product.name,
        description: product.variant,
        price: product.price,
        quantity: getItemCount(product._id),
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");
      const data = await res.json();

      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during checkout!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!groupedItems.length) return <EmptyCart />;

  return (
    <div className="py-10">
      <Container className="bg-tech_white py-5 rounded-md">
        <div className="flex items-center gap-2 py-5">
          <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
          <h1 className="text-xl md:text-2xl font-semibold">Shopping Cart</h1>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-tech_white rounded-lg border mb-6">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Model</th>
                <th className="py-3 px-4 text-center">Quantity</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems.map(({ product }) => {
                const count = getItemCount(product._id);
                return (
                  <tr key={product._id} className="border-b">
                    <td className="p-4">
                      {product.images && (
                        <Link href={`/product/${product?.slug?.current}`}>
                          <Image
                            src={urlFor(product.images[0]).url()}
                            alt={product.name ?? ""}
                            width={80}
                            height={80}
                            className="border rounded-md object-cover"
                          />
                        </Link>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Link href={`/product/${product?.slug?.current}`} className="font-medium hover:text-tech_blue hoverEffect">
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-4 px-4 capitalize">{product.variant}</td>
                    <td className="py-4 px-4 text-center">
                      <QuantityButtons product={product} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <PriceFormatter amount={product.price} />
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      <PriceFormatter amount={(product.price ?? 0 )* count} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700">
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {groupedItems.map(({ product }) => {
            const count = getItemCount(product._id);
            return (
              <Card key={product._id} className="overflow-hidden">
                <div className="flex p-3 border-b">
                  {product.images && (
                    <Link href={`/product/${product?.slug?.current}`} className="mr-3">
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name  ??  ""}
                        width={80}
                        height={80}
                        className="border rounded-md object-cover"
                      />
                    </Link>
                  )}
                  <div className="flex-1">
                    <Link href={`/product/${product?.slug?.current}`} className="font-medium hover:text-primary">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-500 capitalize">Model: {product.variant}</p>
                  </div>
                  <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500">
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Unit Price:</p>
                    <PriceFormatter amount={product.price} className="font-medium" />
                  </div>
                  <QuantityButtons product={product} />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total:</p>
                    <PriceFormatter amount={(product.price ?? 0) * count} className="font-bold" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Button onClick={handleResetCart} variant="destructive" className="w-full mt-2">
              Reset Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>SubTotal</span>
                  <PriceFormatter amount={getSubTotalPrice()} />
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <PriceFormatter amount={getTotalPrice()} />
                </div>

                <Button onClick={handleCheckout} disabled={isProcessing} className="w-full mt-4">
                  {isProcessing ? "Processing..." : "Confirm Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPageClient;
