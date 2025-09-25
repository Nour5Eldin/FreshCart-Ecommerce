"use client";

import Container from "@/components/common/Container";
import Title from "@/components/common/Title";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import useCartStore from "@/store";
import { ChevronLeft, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const ComparePage = () => {
  const { addItem } = useCartStore();
  
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<(Product | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [loading, setLoading] = useState(true);

  const [searches, setSearches] = useState<string[]>(["", "", "", ""]);
  const [searchResults, setSearchResults] = useState<Product[][]>([
    [],
    [],
    [],
    [],
  ]);
  const [loadingSearches, setLoadingSearches] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [showResults, setShowResults] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

const searchRef0 = useRef<HTMLDivElement>(null);
const searchRef1 = useRef<HTMLDivElement>(null);
const searchRef2 = useRef<HTMLDivElement>(null);
const searchRef3 = useRef<HTMLDivElement>(null);

// eslint-disable-next-line react-hooks/exhaustive-deps
const searchRefs = [searchRef0, searchRef1, searchRef2, searchRef3];

  // Load products from URL params
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const slugs = [
          searchParams.get("product1"),
          searchParams.get("product2"),
          searchParams.get("product3"),
          searchParams.get("product4"),
        ];

        const newProducts = [...products];

        for (let i = 0; i < slugs.length; i++) {
          if (slugs[i]) {
            const query = `*[_type == "product" && slug.current == $slug][0]`;
            const product = await client.fetch(query, { slug: slugs[i] });
            newProducts[i] = product;
            setSearches((prev) => {
              const newSearches = [...prev];
              newSearches[i] = product?.name || "";
              return newSearches;
            });
          }
        }

        setProducts(newProducts);
      } catch (error) {
        console.log("Error Fetching Products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handle search
  const handleSearch = useCallback(async (index: number, searchTerm: string) => {
    if (!searchTerm) {
      setSearchResults((prev) => {
        const newResults = [...prev];
        newResults[index] = [];
        return newResults;
      });
      return;
    }

    setLoadingSearches((prev) => {
      const newLoading = [...prev];
      newLoading[index] = true;
      return newLoading;
    });

    try {
      const query = `*[_type == "product" && name match $search] | order(name asc) [0...10]`;
      const params = { search: `${searchTerm}*` };
      const response = await client.fetch(query, params);

      setSearchResults((prev) => {
        const newResults = [...prev];
        newResults[index] = response;
        return newResults;
      });
    } catch (error) {
      console.log("Error searching products", error);
    } finally {
      setLoadingSearches((prev) => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
    }
  }, []);

  // Select product
  const handleSelectProduct = (index: number, product: Product) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[index] = product;
      return newProducts;
    });

    setSearches((prev) => {
      const newSearches = [...prev];
      newSearches[index] = product.name as string;
      return newSearches;
    });

    setShowResults((prev) => {
      const newShow = [...prev];
      newShow[index] = false;
      return newShow;
    });
  };

  // Debounce search
  useEffect(() => {
    const debounceTimers = searches.map((search, index) =>
      setTimeout(() => {
        handleSearch(index, search);
      }, 300)
    );
    return () => {
      debounceTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [searches, handleSearch]);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      searchRefs.forEach((ref, index) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowResults((prev) => {
            const newShow = [...prev];
            newShow[index] = false;
            return newShow;
          });
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRefs ,setSearchResults]);

  // Clear product
  const clearProduct = (index: number) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[index] = null;
      return newProducts;
    });

    setSearches((prev) => {
      const newSearches = [...prev];
      newSearches[index] = "";
      return newSearches;
    });

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (index === 0) params.delete("product1");
    if (index === 1) params.delete("product2");
    if (index === 2) params.delete("product3");
    if (index === 3) params.delete("product4");

    window.history.pushState({}, "", `${url.pathname}?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-tech_blue" />
        <span className="ml-2">Loading Comparison...</span>
      </div>
    );
  }

  return (
    <div className="bg-tech_bg_color py-8">
      <Container>
        <div className="mb-6 flex items-center gap-4">
          <Link
            href={"/"}
            className="flex items-center text-tech_blue hover:text-tech_dark hoverEffect"
          >
            <ChevronLeft /> <span>Back to Home</span>
          </Link>
          
        </div>
        <Title>Product Comparison</Title>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden top-2">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <tbody>
                {/* search row */}
                <tr className="border-b">
                  <td className="p-4 bg-gray-50 font-medium">Search</td>
                  {[0, 1, 2, 3].map((index) => (
                    <td key={`search-${index}`} className="p-4 border-l">
                      <div ref={searchRefs[index]} className="relative">
                        <div className="w-full bg-gray-50 py-2 px-2 rounded-md flex items-center justify-between border">
                          <input
                            placeholder="Search product"
                            className="flex-1 outline-0 text-sm bg-transparent mr-2"
                            value={searches[index]}
                            onChange={(e) => {
                              setSearches((prev) => {
                                const newSearches = [...prev];
                                newSearches[index] = e.target.value;
                                return newSearches;
                              });
                            }}
                            onFocus={() => {
                              setShowResults((prev) => {
                                const newShow = [...prev];
                                newShow[index] = true;
                                return newShow;
                              });
                            }}
                          />
                          {searches[index] ? (
                            <X
                              size={16}
                              className="cursor-pointer text-gray-500 hover:text-tech_blue"
                              onClick={() => clearProduct(index)}
                            />
                          ) : (
                            <Search size={18} className="text-gray-400" />
                          )}
                        </div>

                        {showResults[index] && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                            {loadingSearches[index] ? (
                              <div className="p-2 text-center text-gray-500 text-sm">
                                Loading...
                              </div>
                            ) : searchResults[index].length > 0 ? (
                              searchResults[index].map((p) => (
                                <div
                                  key={p._id}
                                  className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSelectProduct(index, p)}
                                >
                                  {p.name}
                                </div>
                              ))
                            ) : searches[index] ? (
                              <div className="p-2 text-sm text-gray-500">
                                No products found
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* image */}
             <tr className="border-b">
            <td className="p-4 bg-gray-50 font-medium">Image</td>
             {products.map((p, i) => {
             const firstImage = Array.isArray(p?.images) ? p.images[0] : p?.images;

            return (
            <td key={`img-${i}`} className="p-4 border-l">
            {firstImage ? (
            <Image
            src={urlFor(firstImage).width(200).url()} 
            alt={p?.name || ""}
            width={120}
            height={120}
            className="mx-auto"
             />
            ) : (
            <span className="text-gray-400">No image</span>
                 )}
             </td>
            );
            })}
        </tr>
     

                {/* name */}
                <tr className="border-b">
                  <td className="p-4 bg-gray-50 font-medium">Name</td>
                  {products.map((p, i) => (
                    <td key={`name-${i}`} className="p-4 border-l">
                      {p?.name || "-"}
                    </td>
                  ))}
                </tr>

                {/* price */}
                <tr className="border-b">
                  <td className="p-4 bg-gray-50 font-medium">Price</td>
                  {products.map((p, i) => (
                    <td key={`price-${i}`} className="p-4 border-l">
                      {p?.price ? `$${p.price}` : "-"}
                    </td>
                  ))}
                </tr>

                {/* description */}
                <tr className="border-b">
                  <td className="p-4 bg-gray-50 font-medium">Description</td>
                  {products.map((p, i) => (
                    <td key={`desc-${i}`} className="p-4 border-l text-sm">
                      {p?.description || "-"}
                    </td>
                  ))}
                </tr>

                {/* brand */}
                <tr className="border-b">
                  <td className="p-4 bg-gray-50 font-medium">Brand</td>
                  {products.map((p, i) => (
                    <td key={`brand-${i}`} className="p-4 border-l">
                      {p?.brand?._ref || "-"}
                    </td>
                  ))}
                </tr>

                {/* availability */}
                <tr className="border-b">
                  <td className="p-4 bg-gray-50 font-medium">Availability</td>
                  {products.map((p, i) => (
                    <td key={`avail-${i}`} className="p-4 border-l">
                      {p?.stock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* actions */}
                <tr>
                  <td className="p-4 bg-gray-50 font-medium">Actions</td>
                  {products.map((p, i) => (
                    <td key={`actions-${i}`} className="p-4 border-l">
                      {p ? (
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/product/${p.slug?.current}`}
                            className="px-3 py-1 bg-tech_blue text-white rounded hover:bg-blue-500 text-sm"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => addItem(p)}
                            className="px-3 py-1 bg-tech_yellow text-tech_dark  rounded hover:bg-tech_yellow/50 text-sm"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => clearProduct(i)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComparePage;

