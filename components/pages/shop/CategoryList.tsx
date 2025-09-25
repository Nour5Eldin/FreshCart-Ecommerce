"use client";
import Title from '@/components/common/Title';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Category } from '@/sanity.types';
import React from 'react';

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full p-5">
      <Title className="text-base font-black">Categories</Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories?.map((category) => (
          <div
            key={category?._id}
            onClick={() =>
              setSelectedCategory(category?.slug?.current as string)
            }
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="rounded-sm border-black/50"
            />
            <Label
              htmlFor={category?.slug?.current as string}
              className={`${
                selectedCategory === category?.slug?.current
                  ? "font-semibold text-tech_blue"
                  : "font-normal"
              } hover:cursor-pointer`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2
           decoration-[1px] hover:text-tech_blue hoverEffect"
        >
          Reset Selection
        </button>
      )}
    </div>
  );
};

export default CategoryList;

