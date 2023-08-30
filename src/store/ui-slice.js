import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showCartHandler(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showCartHandler } = uiSlice.actions;

export default uiSlice.reducer;
