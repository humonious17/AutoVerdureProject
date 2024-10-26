// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setEmail, setShippingAddress, clearUser } from './userSlice';
import { createSlice } from '@reduxjs/toolkit';

// Create a products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    clearProducts: () => []
  }
});

// Export products actions
export const { setProducts, addProduct, clearProducts } = productsSlice.actions;

// Configure the store with all reducers
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsSlice.reducer
  }
});

// Helper function to set specific states within the store
export const setStoreState = (slice, newState) => {
  switch (slice) {
    case 'products':
      store.dispatch(setProducts(newState));
      break;
    case 'user':
      if (newState.email) store.dispatch(setEmail(newState.email));
      if (newState.shippingAddress) store.dispatch(setShippingAddress(newState.shippingAddress));
      break;
    default:
      console.warn('Unknown slice:', slice);
  }
};

export default store;
