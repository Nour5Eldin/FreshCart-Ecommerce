// fetchers.ts
import { Product } from "@/sanity.types";
import { sanityFetch } from "../lib/live";
import {
  BANNER_QUERY,
  BRANDS_QUERY,
  FEATURED_PRODUCTS,
  LATEST_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SMALL_BANNER_QUERY,
  BRAND_BY_SLUG_QUERY
} from "./query";

// Banners
export const getBanner = async () => {
  try {
    const { data } = await sanityFetch({ query: BANNER_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching Banners Data", error);
    return [];
  }
};

export const getSmallBanner = async () => {
  try {
    const { data } = await sanityFetch({ query: SMALL_BANNER_QUERY });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching Small Banner Data", error);
    return null;
  }
};

// Categories
export const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching Categories Data", error);
    return [];
  }
};

// Products
export const getFeaturedProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: FEATURED_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching Featured Products Data", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

// Brands
export const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return [];
  }
};

export const getBrand = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: BRAND_BY_SLUG_QUERY,
      params: { slug },
    });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching brand by slug:", error);
    return null;
  }
};

// Blogs
export const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
};

export const getRecommendedProducts = async (
  slug: string,
  categoryId: string
): Promise<Product[]> => {
  // Validate inputs
  if (!slug || !categoryId) {
    console.warn("getRecommendedProducts called with invalid parameters:", { slug, categoryId });
    return [];
  }

  try {
    console.log("Fetching recommended products with:", { slug, categoryId });
    
   const result = await sanityFetch({
  query: `
    *[_type == "product" 
      && slug.current != $slug 
      && "${categoryId}" in categories][0...4]{
      _id,
      name,
      price,
      discount,
      images,
      "slug": slug.current,
      stock,
      "categories": categories
    }
  `,
  params: { slug },
});

    const products: Product[] = await getRecommendedProducts(slug, categoryId);
console.log("Recommended products:", products);


    // Check if we have valid data
    if (!result || !result.data) {
      console.warn("No data returned from sanityFetch");
      return [];
    }

    // Ensure we have an array of products
    if (Array.isArray(result.data)) {
      console.log(`Found ${result.data.length} recommended products`);
      return result.data as Product[];
    }
    
    console.warn("Result data is not an array:", result.data);
    return [];
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return [];
  }
};