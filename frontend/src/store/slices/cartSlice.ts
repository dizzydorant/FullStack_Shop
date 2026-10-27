import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
