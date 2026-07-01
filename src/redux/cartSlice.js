import { createSlice } from '@reduxjs/toolkit';

const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const initialTotalAmount = savedItems.reduce((total, item) => total + Number(item.totalPrice), 0);
const initialTotalQuantity = savedItems.reduce((total, item) => total + Number(item.quantity), 0);

const calculateTotalAmount = items => items.reduce((total, item) => total + Number(item.totalPrice), 0);
const calculateTotalQuantity = items => items.reduce((total, item) => total + Number(item.quantity), 0);

const initialState = {
  items: savedItems,
  totalAmount: initialTotalAmount,
  totalQuantity: initialTotalQuantity,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          img: newItem.img,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
      }

      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cartItems');
    },
    setCart: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
    }
  },
});

export const { addToCart, removeFromCart, deleteItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
