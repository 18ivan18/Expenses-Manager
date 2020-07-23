import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false
  },
  reducers: {
    changeLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});
const { actions, reducer } = loadingSlice;

export const selectLoading = (state) => state.loading.loading;

export const { changeLoading } = actions;
export default reducer;
