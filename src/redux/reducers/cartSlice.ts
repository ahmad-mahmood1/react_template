import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, CartState, UpdateItem } from 'src/interfaces/cart.ts';
import { RootState } from 'src/redux/store.ts';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const item = state.cart.find((item) => item.product.id === action.payload.product.id);
      if (!item) {
        state.cart.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<UpdateItem>) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action: PayloadAction<{ productId: number }>) => {
      const { productId } = action.payload;
      state.cart = state.cart.filter((item) => item.product.id !== productId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  updateQuantity,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (state: RootState) => state.cart.cart;
