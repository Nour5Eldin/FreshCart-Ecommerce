import Container from "@/components/common/Container";
import Deal from "@/components/pages/deal/Deal";
import { getCategories, getAllBrands } from "@/sanity/queries";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function DealPage() {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div className="bg-tech_bg_color pb-10">
      <div className="bg-white border-b border-gray-200 py-3">
         <Container className="flex items-center gap-2 text-sm font-medium"> 
        <Link href="/" className="text-tech_blue hover:underline">
            <HomeIcon />
          </Link>
          <span>/</span>
          <span className="text-gray-600">Deal</span>
        
      </Container>
      </div>
     
      <Deal categories={categories} brands={brands} />
    </div>
  );
}
