import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExpensesAPI from "../../API/ExpensesAPI";

export const getGroupsByUserId = createAsyncThunk(
  "groups/getGroupsByUserId",
  async ({ id, token }) => {
    return await ExpensesAPI.getGroupsByUserId(id, token);
  }
);

export const getAllInvites = createAsyncThunk(
  "groups/getAllInvites",
  async ({ id, token }) => {
    return await ExpensesAPI.getAllInvites(id, token);
  }
);

export const handleInvite = createAsyncThunk(
  "groups/handleInvite",
  async ({ invite, token, isAccepted }) => {
    return await ExpensesAPI.handleInvite(invite, token, isAccepted);
  }
);

const GroupSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    invites: [],
  },
  reducers: {},
  extraReducers: {
    [getGroupsByUserId.fulfilled]: (state, action) => {
      state.groups = action.payload;
      for (let index = 0; index < state.groups.length; index++) {
        const element = state.groups[index];
        if (!element.payments) {
          element.payments = [];
        }
      }
    },
    [getGroupsByUserId.rejected]: (state, action) => {
      console.log(action.error);
    },
    [getAllInvites.fulfilled]: (state, action) => {
      state.invites = action.payload;
    },
    [getAllInvites.rejected]: (state, action) => {
      console.log(action.error);
    },
    [handleInvite.fulfilled]: (state, action) => {
      const index = state.invites
        .map((inv) => inv._id)
        .indexOf(action.payload._id);
      state.invites[index] = action.payload;
    },
    [handleInvite.rejected]: (state, action) => {
      console.log(action.error);
    },
  },
});
const { actions, reducer } = GroupSlice;

export const {} = actions;
export default reducer;
