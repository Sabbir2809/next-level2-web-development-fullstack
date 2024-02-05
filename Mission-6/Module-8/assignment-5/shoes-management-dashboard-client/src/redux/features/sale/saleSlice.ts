import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleProduct: null,
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    setSaleProduct: (state, action) => {
      state.saleProduct = action.payload;
    },
  },
});

export const { setSaleProduct } = saleSlice.actions;
export default saleSlice.reducer;
