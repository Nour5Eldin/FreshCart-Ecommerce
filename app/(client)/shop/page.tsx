import Container from '@/components/common/Container';
import Shop from '@/components/pages/shop/Shop';
import { getAllBrands, getCategories } from '@/sanity/queries'
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const ShopPage = async () => {
    const categories = await getCategories();
    const brands = await getAllBrands();

  return (
    <div className="bg-tech_bg_color pb-10">
      {/* Back bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <Container className="flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="text-tech_blue hover:underline">
            <HomeIcon />
          </Link>
          <span>/</span>
          <span className="text-gray-600">Shop</span>
        </Container>
      </div>

      <Shop categories={categories} brands={brands} />
    </div>
  )
}

export default ShopPage
