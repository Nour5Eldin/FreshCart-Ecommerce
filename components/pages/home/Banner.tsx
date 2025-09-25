import React from "react"
import Image from "next/image"
import Container from "@/components/common/Container"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { urlFor } from "@/sanity/lib/image"
import { getBanner, getSmallBanner } from "@/sanity/queries"
import ProductComparison from "./ProductComparison"


interface BannerItem {
  _id: string;
  title?: string;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  key: string; 
}
const Banner = async () => {
  const banner = await getBanner()
  const smallBanner: BannerItem | null = await getSmallBanner();

  return (
    <Container className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-4">
      {/* Main Banner Carousel */}
      <div className="w-full lg:col-span-3">
        <Carousel className="relative w-full h-[400px] overflow-hidden rounded-md">
          <CarouselContent>
            {banner?.map((item: BannerItem, index: number)=> (
              <CarouselItem key={index}>
                <div className="relative w-full h-[400px]">
                  {item?.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={`Banner ${index + 1}`}
                      fill
                      className="object-fill"
                      priority={index === 0}
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      {/* Sidebar Section */}
      <div className="hidden h-full flex-col gap-5 lg:flex">
        <ProductComparison />

        {/* Optional Small Banner */}
        <div className="relative h-1/2 w-full overflow-hidden rounded-md">
          
       {smallBanner?.image && (
      <Image
         src={urlFor(smallBanner.image).url()}
          alt={smallBanner?.title || "Small Banner"}
          sizes="(max-width: 768px) 100vw, 25vw"
           priority
           fill
           className="object-cover rounded-md"
           />
)}
        </div>
      </div>
    </Container>
  )
}

export default Banner
