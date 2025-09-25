import { getFeaturedProducts } from '@/sanity/queries'

import React from 'react'
import Container from './Container';
import Title from './Title';
import ProductCard from './ProductCard';
import { Product } from '@/sanity.types';

const ProductGrid = async () => {
    const products = await getFeaturedProducts();

  return (
    <Container>
      <div className="text-center">
        <Title className="text-lg font-bold">Featured Products</Title>
        <p className="text-sm font-medium">Check & Get Your Desired Product!</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5">
        {products?.map((product: Product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductGrid
