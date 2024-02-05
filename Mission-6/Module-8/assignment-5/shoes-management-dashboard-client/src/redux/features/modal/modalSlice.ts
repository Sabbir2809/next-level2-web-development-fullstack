import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isEditModalOpen: false,
  isSaleModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsActiveModal: (state, actions) => {
      state.isModalOpen = actions.payload;
    },
    setIsEditActiveModal: (state, actions) => {
      state.isEditModalOpen = actions.payload;
    },
    setIsSaleActiveModal: (state, actions) => {
      state.isSaleModalOpen = actions.payload;
    },
  },
});

export const { setIsActiveModal, setIsEditActiveModal, setIsSaleActiveModal } = modalSlice.actions;
export default modalSlice.reducer;
