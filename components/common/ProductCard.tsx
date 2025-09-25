import { Product } from '@/sanity.types'
import Image from "next/image";
import Link from 'next/link'
import React from 'react'
import Title from './Title';
import PriceView from './PriceView';
import AddToCardButton from './AddToCardButton';
import { image } from '@/sanity/image';

const ProductCard = ({product}:{product:Product}) => {
  return (
    <div className="text-sm rounded-md group bg-tech_white">
      <div className="relative overflow-hidden">
      {product?.images && (<Link href={`/product/${product?.slug?.current}`}>
<div className="w-full aspect-square flex items-center justify-center bg-white rounded-md overflow-hidden">
  
<Image
  src={image(product?.images[0]).size(900, 900).url()}
  alt="productImage"
  width={900}
  height={900}
  loading="lazy"
  className={`object-contain max-w-[85%] max-h-[85%] 
    ${product?.stock !== 0 
      ? "scale-90 group-hover:scale-100 transition-transform duration-300 ease-in-out" 
      : "opacity-50"
    } hoverEffected`}
/>
  
</div></Link>)}
        {(product?.discount as number) > 0 && (
          <p className="absolute top-2 left-0 z-10 text-xs border border-l-0 bg-tech_dark_red text-tech_white font-semibold border-tech_dark/50">
            save: $ {Math.round((product?.price as number) * ((product?.discount as number) / 100))}{} {`(-${product?.discount}%)`}
          </p>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-tech_dark/60">
            {product?.categories.map((cat) => cat).join(" , ")}
          </p>
        )}
        <Title className="text-base line-clamp-2 h-12">
          {product?.name}
        </Title>
        <div className="flex items-center gap-2.5">
          <p className={`${product?.stock === 0 && "text-tech_dark_red"}`}>
            {product.stock !==0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="font-semibold text-tech_light_green">
            {(product?.stock as number) > 0 && product?.stock}
          </p>
        </div>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCardButton product={product} className="w-40 rounded-full"/>
      </div>
    </div>
  )
}

export default ProductCard
