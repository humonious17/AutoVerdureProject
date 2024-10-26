// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
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
    clearProducts: (state) => {
      return [];
    }
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

// Export a function to get the entire state (if needed)
export const getStoreState = () => store.getState();

// Helper function to dispatch actions (if needed)
export const setStoreState = (slice, newState) => {
  switch (slice) {
    case 'products':
      store.dispatch(setProducts(newState));
      break;
    case 'user':
      store.dispatch({ type: 'user/setState', payload: newState });
      break;
    default:
      console.warn('Unknown slice:', slice);
  }
};

export default store;