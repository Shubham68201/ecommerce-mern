import { createSlice } from '@reduxjs/toolkit';

const cartFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { items: [], shippingInfo: {} };

const initialState = {
  items: cartFromStorage.items,
  shippingInfo: cartFromStorage.shippingInfo,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find((x) => x.product === item.product);

      if (existItem) {
        // Update quantity
        state.items = state.items.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.items.push(item);
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.product !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateCartQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item.product === product ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.shippingInfo = {};
      localStorage.removeItem('cart');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  saveShippingInfo,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;