import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  notification: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showCartHandler(state) {
      state.isVisible = !state.isVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const { showCartHandler, showNotification } = uiSlice.actions;

export default uiSlice.reducer;
