import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    change: false,
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    cartAddItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.change = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
        });

        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.totalAmount = state.totalAmount + newItem.price;
      } else {
        const totalQuantity = existingItem.quantity + newItem.quantity;
        existingItem.quantity = totalQuantity;
        existingItem.totalPrice = totalQuantity * existingItem.price;

        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.totalAmount = state.totalAmount + newItem.price * newItem.quantity;
      }
    },

    cartRemoveItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.change = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);

        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      }
    },
  },
});

export const { cartAddItem, cartRemoveItem, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;
