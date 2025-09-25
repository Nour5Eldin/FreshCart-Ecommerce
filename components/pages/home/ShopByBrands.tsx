import Container from "@/components/common/Container";
import Title from "@/components/common/Title";
import { Brand } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getAllBrands } from "@/sanity/queries";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
    const brands = await getAllBrands();

  return (
    <Container className="mt-10 lg:mt-20 bg-tech_white p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Shop by brands</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-tech_dark_red hoverEffect"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
        {brands?.map((brand: Brand) => (
          <Link
            key={brand?._id}
            href={{
              pathname: "/shop",
              query: { brand: brand?.slug?.current },
            }}
            className="border hover:border-tech_yellow w-36 h-24 flex items-center justify-center rounded-md overflow-hidden hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                width={300}
                height={300}
                alt="brandImage"
                className="w-24 h-24 object-contain"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 p-2">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border px-5 py-3 rounded-md hover:border-tech_light_green hoverEffect"
          >
            <span>{item?.icon}</span>
            <div className="text-sm">
              <p className="text-tech_dark_color/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-tech_light_color">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShopByBrands;