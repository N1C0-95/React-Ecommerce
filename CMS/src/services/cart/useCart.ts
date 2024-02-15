import { create } from "zustand";
import { CartItem } from "../../model/cart-item";
import { Product } from "../../model/product";

export interface CartState {
  list: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increseQuantity: (productId: string) => void;
  decreseQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set, get) => ({
  list: [],
  addToCart: (product: Product) => {
    const found = get().list.find((p) => p.product.id === product.id);
    if (found) {
      get().increseQuantity(product.id);
    } else {
      const item: CartItem = { product, quantity: 1 };
      set({ list: [...get().list, item] });
    }
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      list: state.list.filter((item) => {
        return item.product.id != productId;
      }),
    }));
  },

  increseQuantity: (productId: string) => {
    const found = get().list.find((p) => p.product.id === productId);
    if (found) {
      found.quantity++;
      set((state) => ({
        list: state.list.map((item) => {
          return item.product.id === found.product.id ? found : item;
        }),
      }));
    }
  },
  
  decreseQuantity: (productId: string) => {

    const found = get().list.find((p) => p.product.id === productId);

    if (found) {
      found.quantity--;
      if (found.quantity === 0) {
        get().removeFromCart(found.product.id);
      }
      set((state) => ({
        list: state.list.map((item) => {
          return item.product.id === found.product.id ? found : item;
        }),
      }));
    }
  },
  clearCart: () => {
    set(state => ({list : []}))
  },
}));
