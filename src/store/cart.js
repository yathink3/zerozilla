import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], itemLength: 0 };

const cartSlice = createSlice({
  name: "uiSettings",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload) {
        const valIndex = state.items.findIndex(
          (el) => el.id === action.payload.id
        );
        if (valIndex !== -1) {
          state.items[valIndex].count = (state.items[valIndex].count || 0) + 1;
        } else state.items.push(action.payload);
        state.itemLength++;
      }
    },
    removeFromCart: (state, action) => {
      if (action.payload) {
        const valIndex = state.items.findIndex(
          (el) => el.id === action.payload.id
        );
        if (valIndex !== -1) {
          if (state.items[valIndex].count == 0) state.items.splice(valIndex, 1);
          else
            state.items[valIndex].count =
              (state.items[valIndex].count || 1) - 1;
          if (state.itemLength != 0) state.itemLength--;
        }
      }
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart } = cartSlice.actions;
