import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  shippingAddress: {
    street: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
    },
    clearUser: (state) => {
      state.email = '';
      state.shippingAddress = { street: '' };
    }
  }
});

// Actions
export const { setEmail, setShippingAddress, clearUser } = userSlice.actions;

// Selectors
export const selectEmail = (state) => state.user.email;
export const selectShippingAddress = (state) => state.user.shippingAddress;

export default userSlice.reducer;
