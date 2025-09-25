import ProductGrid from "@/components/common/ProductGrid";
import Banner from "@/components/pages/home/Banner";
import HomeCategories from "@/components/pages/home/HomeCategories";
import ShopByBrands from "@/components/pages/home/ShopByBrands";
import { getCategories } from "@/sanity/queries";


export default async function Home() {
  const categories = await getCategories()
  console.log(categories)
  return (
    <div className="bg-tech_bg_color  pt-5 pb-10">
      <Banner />
      <HomeCategories categories={categories} />
      <div className="p-10">
        <ProductGrid />
        <ShopByBrands/>
      </div>
    </div>
  )

}
