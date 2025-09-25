"use client";
import Container from "@/components/common/Container";
import Title from "@/components/common/Title";
import { Brand, Category, Product } from "@/sanity.types";
import { Filter, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryList from "@/components/pages/shop/CategoryList";
import BrandList from "@/components/pages/shop/BrandList";
import PriceList from "@/components/pages/shop/PriceList";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/common/ProductCard";
import NoProductAvailable from "@/components/common/NoProductAvailable";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const Deal = ({ categories, brands }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("tv"); 
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const resetFilters = () => {
    setSelectedCategory("tv"); 
    setSelectedBrand(null);
    setSelectedPrice(null);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }

       const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;

      const data = await client.fetch(query, {
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
      });

      setProducts(data);
    } catch (error) {
      console.log("Deal product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5 bg-tech_bg_color py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Title className="md:text-lg uppercase tracking-wide">
              TV Deals
            </Title>
            <div className="flex items-center gap-3">
              {(selectedCategory !== null ||
                selectedBrand !== null ||
                selectedPrice !== null) && (
                <button
                  onClick={resetFilters}
                  className="text-tech_orange underline text-sm font-medium hover:text-tech_dark_red hoverEffect"
                >
                  Reset Filters
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1 bg-tech_orange text-white px-3 py-1.5 rounded-md"
              >
                {showFilters ? <X size={16} /> : <Filter size={16} />}
                <span>{showFilters ? "Hide" : "Filters"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 border-t border-t-tech_orange/50">
          {/* Sidebar */}
          <div
            className={`
              md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto
              md:min-w-64 pb-5 border-r border-r-tech_orange/50 bg-white
              fixed z-50 md:z-10 left-0 top-0 h-full w-[280px] transition-transform duration-300
              ${showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
          >
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>

          {/* Products */}
          <div className="flex-1 pt-2">
            {loading ? (
              <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white rounded-md">
                <Loader2 className="w-10 h-10 text-tech_orange animate-spin" />
                <p className="font-semibold tracking-wide text-base">
                  Loading TV Deals...
                </p>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <NoProductAvailable className="bg-white mt-0 rounded-md h-full" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Deal;


