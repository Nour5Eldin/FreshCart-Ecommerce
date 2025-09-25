import { type SchemaTypeDefinition } from 'sanity'
import { bannerType } from './bannerType'
import { addressType } from "./addressType";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { blogCategoryType } from "./blogCategoryType";
import { blogType } from "./blogType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { productType } from "./productType";
import { brandType } from "./brandTypes";
import { smallBannerType } from './smallBannerType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    categoryType,
    brandType,
    addressType,
    orderType,
    bannerType,
    smallBannerType,
    blogType,
    blogCategoryType,
    authorType,
    blockContentType,
  ],
};
