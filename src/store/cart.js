import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cartData',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload) {
        const valIndex = state.items.findIndex(el => el.id === action.payload.id);
        if (valIndex === -1) {
          action.payload.count = 1;
          state.items.push(action.payload);
        } else state.items[valIndex].count++;
      }
    },
    removeFromCart: (state, action) => {
      if (action.payload) {
        const valIndex = state.items.findIndex(el => el.id === action.payload.id);
        if (valIndex !== -1) {
          if (state.items[valIndex].count == 1) state.items.splice(valIndex, 1);
          else state.items[valIndex].count--;
        }
      }
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart } = cartSlice.actions;
