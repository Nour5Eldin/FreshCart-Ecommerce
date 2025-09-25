import { Product } from "./sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getTotalItemCount: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];

  // Favorites
  favoriteProduct: Product[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  getFavoriteCount: () => number;
  resetFavorite: () => void;
}

const useCartStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],

      // Cart actions
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(({ product }) => product?._id !== productId),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0),
      getSubTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price - discount;
          return total + discountedPrice * item.quantity;
        }, 0),
      getTotalItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getItemCount: (productId) =>
        get().items.find((item) => item.product._id === productId)?.quantity ?? 0,
      getGroupedItems: () => get().items,

      // Favorites actions
      addToFavorite: (product) =>
        set((state) => ({
          favoriteProduct: [...state.favoriteProduct, product],
        })),
      removeFromFavorite: (productId) =>
        set((state) => ({
          favoriteProduct: state.favoriteProduct.filter((item) => item._id !== productId),
        })),
      toggleFavorite: (product) =>
        set((state) => {
          const isFav = state.favoriteProduct.some((item) => item._id === product._id);
          return {
            favoriteProduct: isFav
              ? state.favoriteProduct.filter((item) => item._id !== product._id)
              : [...state.favoriteProduct, product],
          };
        }),
      isFavorite: (productId) =>
        get().favoriteProduct.some((item) => item._id === productId),
      getFavoriteCount: () => get().favoriteProduct.length,
      resetFavorite: () => set({ favoriteProduct: [] }),
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;

