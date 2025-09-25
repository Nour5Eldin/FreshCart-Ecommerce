import { defineQuery } from "next-sanity";

export const BANNER_QUERY = defineQuery(`*[_type == "banner"] | order(publishedAt desc)`);

export const SMALL_BANNER_QUERY = defineQuery(`
  *[_type == "smallBanner"][0]{
    title,
    slug,
    image
  }
`);

export const FEATURED_PRODUCTS = defineQuery(`
  *[_type == 'product' && isFeatured == true] | order(name asc){
    ...,
    "categories": categories[]->title
  }
`);

export const LATEST_BLOG_QUERY = defineQuery(`
  *[_type == 'blog' && isLatest == true] | order(name asc){
    ...,
    blogcategories[]->{
      title
    }
  }
`);

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }
`);

export const BRAND_BY_SLUG_QUERY = defineQuery(`
  *[_type == "brand" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    ...,
    "categories": categories[]->title,
    "brandName": brand->title
  }
`);

export const DEAL_PRODUCTS = defineQuery(`
  *[_type == 'product' && status == 'hot'] | order(name asc){
    ...,
    "categories": categories[]->title
  }
`);

export const MY_ORDERS_QUERY = defineQuery(`
  *[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,
    products[]{
      ..., product->
    }
  }
`);

