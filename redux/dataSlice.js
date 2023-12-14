import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    authId: '',
    cart: [],
    subtotal: 0,
    total: 0,
  },
  reducers: {
    updateAuthId: (state, action) => {
      state.authId = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }

      state.subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.total = state.subtotal;
    },
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cart = state.cart.filter(item => item.id !== itemToRemove.id);
    
      state.subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.total = state.subtotal;
    },
    increaseQuantity: (state, action) => {
      const itemToIncrease = action.payload;
      const existingItem = state.cart.find(item => item.id === itemToIncrease.id);

      if (existingItem) {
        existingItem.quantity += 1;

        state.subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.total = state.subtotal;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemToDecrease = action.payload;
      const existingItem = state.cart.find(item => item.id === itemToDecrease.id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;

        state.subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.total = state.subtotal;
      }
    },
    clearCart: state => {
      state.cart = [];
      state.subtotal = 0;
      state.total = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAuthId,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = DataSlice.actions;

export default DataSlice.reducer;
