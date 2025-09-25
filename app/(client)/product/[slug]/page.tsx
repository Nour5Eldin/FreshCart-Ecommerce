import Container from '@/components/common/Container';
import AddToCardButton from '@/components/common/AddToCardButton';
import FavoriteButton from '@/components/common/WishListButton';
import PriceView from '@/components/common/PriceView';
import ProductCharacteristics from '@/components/common/ProductCharacteristics';
import ImageView from '@/components/pages/ProductDetails/ImageView';
import ShareBadge from '@/components/pages/ProductDetails/ShareBadge';
import { Product } from '@/sanity.types';
import { CornerDownLeft, StarIcon, Truck } from 'lucide-react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { getProductBySlug } from '@/sanity/queries';

const ProductPageDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product: Product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>; 
  }
 
  
  return (
    <div className="bg-tech_white py-10">
      <Container>
        <ShareBadge product={product} />
        <div className="flex flex-col md:flex-row gap-5">
          {product.images && (
            <ImageView images={product.images} isStock={product.stock} />
          )}
          <div className="w-full md:w-3/5 flex flex-col gap-5">
            <div className="space-y-1">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="flex items-center gap-0.5 text-xs">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={12}
                    className="text-tech_light_green"
                    fill={"#3b9c3c"}
                  />
                ))}
                <p className="font-semibold">(120)</p>
              </div>
            </div>

            <div className="space-y-2 border-y border-t-gray-200 py-5">
              <PriceView
                price={product.price}
                discount={product.discount}
                className="text-lg font-bold"
              />
              <p
                className={`w-20 text-center text-xs py-1.5 font-semibold rounded-lg ${
                  product.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"
                }`}
              >
                {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* Client Component */}
            <div className="flex items-center gap-2.5 lg:gap-5">
              <AddToCardButton product={product} />
              <FavoriteButton product={{ ...product }}/>
            </div>

            <ProductCharacteristics product={product} />

            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <RxBorderSplit className="text-lg" />
                <p>Compare color</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <FaRegQuestionCircle className="text-lg" />
                <p>Ask a question</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <TbTruckDelivery className="text-lg" />
                <p>Delivery & Return</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <FiShare2 className="text-lg" />
                <p>Share</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border border-tech_light_color/25 border-b-0 p-3 flex items-center gap-2.5">
                <Truck size={30} className="text-tech_orange" />
                <div>
                  <p className="text-base font-semibold text-black">
                    Free Delivery
                  </p>
                  <p className="text-sm text-gray-500 underline underline-offset-2">
                    Enter your Postal code for Delivery Availability.
                  </p>
                </div>
              </div>
              <div className="border border-tech_light_color/25 p-3 flex items-center gap-2.5">
                <CornerDownLeft size={30} className="text-tech_orange" />
                <div>
                  <p className="text-base font-semibold text-black">
                    Return Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    Free 30days Delivery Returns.{" "}
                    <span className="underline underline-offset-2">
                      Details
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPageDetails;
