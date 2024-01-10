import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type TCounterType = { count: number };
const initialState: TCounterType = { count: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    increment(state) {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count <= 0 ? state.count : state.count - 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.count = state.count + action.payload;
    },
  },
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;
export default counterSlice.reducer;
