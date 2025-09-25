import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import Title from "./Title";
import { getRecommendedProducts } from "@/sanity/queries";

interface RecommendedProps {
  slug: string;
  categoryId: string;
}

const RecommendedProducts = async ({ slug, categoryId }: RecommendedProps) => {
  // لو مفيش slug أو categoryId رجع رسالة
  if (!slug || !categoryId) {
    return (
      <div className="mt-10">
        <Title className="mb-5">Related Products</Title>
        <p className="text-gray-500">No related products found</p>
      </div>
    );
  }

  // جلب المنتجات من نفس الكاتيجوري باستثناء المنتج الحالي
  const products: Product[] = await getRecommendedProducts(slug, categoryId);

  if (!products.length) {
    return (
      <div className="mt-10">
        <Title className="mb-5">Related Products</Title>
        <p className="text-gray-500">No related products found</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Title className="mb-5">Related Products</Title>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <div key={product._id} className="min-w-[220px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
