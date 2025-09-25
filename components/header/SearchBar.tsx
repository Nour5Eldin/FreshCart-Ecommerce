"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // يتحكم في ظهور الاقتراحات أو شاشة الموبايل
  const searchRef = useRef<HTMLDivElement>(null);

  // جلب المنتجات من Sanity
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $searchi] | order(name asc)[0...10]`;
      const params = { searchi: `*${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, fetchProducts]);

  // إغلاق الاقتراحات عند الضغط خارج البحث (الكمبيوتر)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // عند اختيار المنتج
  const handleSelectProduct = (product: Product) => {
    setSearch(product.name ?? "");
    setShowResults(false);
    router.push(`/product/${product.slug?.current}`);
  };

  return (
    <div ref={searchRef} className="relative w-full lg:w-[500px]">
      {/* نسخة الكمبيوتر */}
      <div className="hidden lg:flex relative items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="w-full rounded-md border border-black bg-white text-black placeholder-gray-400 px-6 py-2 focus:outline-none focus:border-yellow-500"
        />
        {search ? (
          <X
            onClick={() => {
              setSearch("");       // يمسح النص
              setShowResults(false); // يخفي الاقتراحات
            }}
            className="absolute right-3 cursor-pointer text-black hover:text-yellow-500"
          />
        ) : (
          <Search className="absolute right-3 text-black" />
        )}
      </div>

      {/* نسخة الموبايل: أيقونة البحث فقط */}
      <div className="flex lg:hidden items-center justify-end">
        <Search
          className="text-white cursor-pointer"
          size={24}
          onClick={() => setShowResults(true)}
        />
      </div>

      {/* شاشة البحث للموبايل */}
      {showResults && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-black bg-white text-black placeholder-gray-400 px-6 py-2 focus:outline-none focus:border-tech_yellow"
            />
            <X
              onClick={() => {
                if (search) {
                  setSearch(""); // يمسح النص أول مرة
                } else {
                  setShowResults(false); // يغلق الشاشة لو النص فارغ
                }
              }}
              className="ml-2 text-black cursor-pointer hover:text-tech_yellow"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 size={16} className="animate-spin text-black" />
              <span className="ml-2 text-sm">Searching...</span>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleSelectProduct(product)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-tech_yellow  cursor-pointer"
              >
                {product.images?.[0] && (
                  <Image
                    src={urlFor(product.images[0]).url()}
                    alt={product.name || "product"}
                    width={40}
                    height={40}
                    className="rounded-sm object-cover"
                  />
                )}
                <span className="text-black font-medium">{product.name}</span>
              </div>
            ))
          ) : search ? (
            <div className="p-2 text-sm text-gray-500">No products found</div>
          ) : null}
        </div>
      )}

      {/* قائمة الاقتراحات للكمبيوتر */}
      {showResults && products.length > 0 && (
        <div className="hidden lg:block absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleSelectProduct(product)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-tech_yellow cursor-pointer"
            >
              {product.images?.[0] && (
                <Image
                  src={urlFor(product.images[0]).url()}
                  alt={product.name || "product"}
                  width={40}
                  height={40}
                  className="rounded-sm object-cover"
                />
              )}
              <span className="text-black font-medium">{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;



