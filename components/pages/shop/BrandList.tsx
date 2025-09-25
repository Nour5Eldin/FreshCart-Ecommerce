"use client";
import Title from '@/components/common/Title';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Brand } from '@/sanity.types'
import React from 'react'

interface Props {
    brands: Brand[];
    selectedBrand?: string | null;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}
const BrandList = ({
    brands,
    selectedBrand,
    setSelectedBrand
}: Props) => {
    return (
        <div className="w-full p-5">
            <Title className="text-base font-black">Brands</Title>
            <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
                {brands?.map((brand) => (
                    <div key={brand?._id} onClick={() =>
                        setSelectedBrand(brand?.slug?.current as string)
                    } className="flex items-center space-x-2 hover:cursor-pointer">
                        <RadioGroupItem value={brand?.slug?.current as string}
                            id={brand?.slug?.current}
                            className="rounded-sm border-black/50" />
                        <Label htmlFor={brand?.slug?.current as string}
                            className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-tech_blue" : "font-normal"} hover:cursor-pointer`}>{brand?.title}</Label>
                    </div>
                ))}
            </RadioGroup>
            {selectedBrand && <button onClick={() => setSelectedBrand(null)} className="text-sm font-medium mt-2 underline underline-offset-2
           decoration-[1px] hover:text-tech_blue hoverEffect">Reset Selection</button>}
        </div>
    );
};

export default BrandList