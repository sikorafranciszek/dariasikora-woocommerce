import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, WooCommerceProduct, WooCommerceVariation } from '@/types/woocommerce';

// Re-export CartItem for convenience
export type { CartItem };

interface CartState {
  items: CartItem[];
  addItem: (product: WooCommerceProduct, quantity: number, variation?: WooCommerceVariation) => void;
  removeItem: (productId: number, variationId?: number) => void;
  updateQuantity: (productId: number, quantity: number, variationId?: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity, variation) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedVariation?.id === variation?.id
          );

          if (existingItemIndex > -1) {
            // Update quantity if item exists
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                selectedVariation: variation,
              },
            ],
          };
        });
      },

      removeItem: (productId, variationId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                (variationId === undefined || item.selectedVariation?.id === variationId)
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, variationId) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (
              item.product.id === productId &&
              (variationId === undefined || item.selectedVariation?.id === variationId)
            ) {
              return { ...item, quantity };
            }
            return item;
          });
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const price = item.selectedVariation?.price || item.product.price;
          return total + parseFloat(price) * item.quantity;
        }, 0);
      },

      getSubtotal: () => {
        const items = get().items;
        return items.reduce((subtotal, item) => {
          const price = item.selectedVariation?.regular_price || item.product.regular_price;
          return subtotal + parseFloat(price) * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Return a no-op storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
