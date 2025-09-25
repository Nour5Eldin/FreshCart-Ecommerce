"use client";
import Title from '@/components/common/Title';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react'

const PriceArray = [
    { title: "Under $100", value: "0-100" },
    { title: "$100 - $500", value: "100-500" },
    { title: "$500 - $1000", value: "500-1000" },
    { title: "$1000 - $5000", value: "1000-5000" },
    { title: "Over $5000", value: "5000-10000" },
];


interface Props {
    selectedPrice?: string | null;
    setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const PriceList = ({
    selectedPrice,
    setSelectedPrice,
}:Props) => {
    return (
        <div className="w-full p-5">
            <Title className="text-base font-black">Price</Title>
            <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
                {PriceArray?.map((price, index) => (
                    <div key={index} onClick={() =>
                        setSelectedPrice(price?.value)
                    } className="flex items-center space-x-2 hover:cursor-pointer">
                        <RadioGroupItem 
                            value={price?.value}
                            id={price?.value}
                            className="rounded-sm border-black/50" />
                        <Label htmlFor={price?.title}
                            className={`${selectedPrice  === price?.value ? "font-semibold text-tech_blue" : "font-normal"} hover:cursor-pointer`}>{price?.title}</Label>
                    </div>
                ))}
            </RadioGroup>
            {selectedPrice && <button onClick={()=> setSelectedPrice(null)} className="text-sm font-medium mt-2 underline underline-offset-2
           decoration-[1px] hover:text-tech_blue hoverEffect">Reset Selection</button>}
        </div>
    );
};

export default PriceList
