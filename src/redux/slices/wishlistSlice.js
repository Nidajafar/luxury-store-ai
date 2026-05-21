import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        state.items = state.items.filter(item => item._id !== action.payload._id);
        alert("💔 Removed from your Wishlist");
      } else {
        state.items.push(action.payload);
        alert("💖 Added to your Wishlist!");
      }
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;