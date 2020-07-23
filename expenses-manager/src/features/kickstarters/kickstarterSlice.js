import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExpensesAPI from "../../API/ExpensesAPI";

export const getAllKickstarters = createAsyncThunk(
  "kickstarters/getAllKickstarters",
  async () => {
    return await ExpensesAPI.getAllKickstarters();
  }
);

export const getKickstarterById = createAsyncThunk(
  "kickstarters/getKickstarterById",
  async (id) => {
    return await ExpensesAPI.getKickstarterById(id);
  }
);

const KickstarterSlice = createSlice({
  name: "kickstarters",
  initialState: {
    kickstarters: [],
    targetKickstarter: undefined,
  },
  reducers: {},
  extraReducers: {
    [getAllKickstarters.fulfilled]: (state, action) => {
      state.kickstarters = action.payload;
    },
    [getAllKickstarters.rejected]: (state, action) => {
      console.log(action.error);
    },
    [getKickstarterById.fulfilled]: (state, action) => {
      state.targetKickstarter = action.payload;
    },
    [getKickstarterById.rejected]: (state, action) => {
      console.log(action.error);
    },
  },
});
const { actions, reducer } = KickstarterSlice;

export const {} = actions;
export default reducer;
