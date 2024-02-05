import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatedProduct: null,
  searchProduct: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setUpdatedProduct: (state, action) => {
      state.updatedProduct = action.payload;
    },
    setSearchProduct: (state, action) => {
      state.searchProduct = action.payload;
    },
  },
});

export const { setUpdatedProduct, setSearchProduct } = productSlice.actions;
export default productSlice.reducer;
