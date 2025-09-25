import Container from "@/components/common/Container";
import Title from "@/components/common/Title";
import { Category } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { ChartArea, FileQuestion, Laptop, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  categories: Category[];
}

const data = [
  {
    title: "Laptop Finder",
    description: "Find Your Laptop Easily",
    icon: <Laptop className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Raise a Complain",
    description: "Share your experience",
    icon: <ChartArea className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Online Support",
    description: "Get Online Support",
    icon: <FileQuestion className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Service Center",
    description: "Repair Your Device",
    icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />,
  },
];

const HomeCategories = ({ categories }: Props) => {
  return (
    <Container className="mt-10 lg:mt-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
        {data?.map((item) => (
          <div
            key={item?.title}
            className="flex items-center justify-center md:justify-baseline gap-3 md:gap-5 bg-white rounded-md border border-tech_yellow/20 hover:border-tech_yellow  hoverEffect p-3"
          >
            <span className="bg-tech_blue text-white p-2 rounded-full">
              {item?.icon}
            </span>
            <div>
              <h3 className="text-sm md:text-base font-semibold tracking-wide">
                {item?.title}
              </h3>
              <p className="text-sm  ">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Categories */}
      <div className="text-center space-y-1.5 mb-5 md:mb-10">
        <Title>Featured Categories</Title>
        <p>Get Your Desired Product from Featured Category!</p>
      </div>
      <div className="mt-5 grid grid-cols-4 md:grid-cols-8 gap-2.5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-white p-5 flex flex-col items-center gap-3 rounded-lg border border-transparent hover:border-tech_yellow hoverEffect relative"
          >
            {category?.image && (
              <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden">
                <Image
                  src={urlFor(category?.image).url()}
                  alt="categoryImage"
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </div>
            )}
            <p className="text-xs md:text-sm font-semibold text-center line-clamp-1">
              {category?.title}
            </p>
            <Link
              href={`/category/${category?.slug?.current}`}
              className="absolute inset-1"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomeCategories;