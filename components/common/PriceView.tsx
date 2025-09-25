import PriceFormatter from "./PriceFormatter";

interface Props {
    price: number | undefined;
    discount: number | undefined;
    className?: string;
}

const PriceView = ({ price, discount}: Props) => {
    return (
    <div className="flex items-center gap-2">
      <PriceFormatter amount={price} className="text-tech_dark_red" />
      {price && discount && (
        <PriceFormatter
          amount={price + (discount * price) / 100}
          className="line-through font-normal text-tech_dark/70"
        />
      )}
    </div>
    );
};

export default PriceView;