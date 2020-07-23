import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const DateSlice = createSlice({
  name: "date",
  initialState: { date: new Date() },
  reducers: {
    setDate: (state, action) => {
      state.date = new Date(action.payload)
    },
  },
  extraReducers: {},
});
const { actions, reducer } = DateSlice;

export const { setDate } = actions;
export default reducer;
