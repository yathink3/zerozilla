import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cart';
export default configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
