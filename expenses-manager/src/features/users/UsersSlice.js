import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExpensesAPI from "../../API/ExpensesAPI";

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async ({ id, token }) => {
    try {
      const response = await ExpensesAPI.findUserById(id, token);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (auth) => {
    try {
      const response = await ExpensesAPI.findAllUsers(auth);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, auth }) => {
    try {
      return await ExpensesAPI.deleteUserById(id, auth);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, auth, user }) => {
    try {
      return await ExpensesAPI.updateUserById(id, auth, user);
    } catch (error) {
      console.log(error);
    }
  }
);

const AuthSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    targetUser: undefined,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [fetchUserById.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.targetUser = action.payload;
      }
    },
    [fetchUserById.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [fetchAllUsers.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.entities = action.payload.success ? action.payload.users : [];
        state.error = action.payload.message;
      }
    },
    [fetchAllUsers.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [deleteUser.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (state.loading === "pending" && action.payload.success) {
        state.loading = "idle";
        state.entities = state.entities.filter(
          (user) => user.email !== action.payload.user.email
        );
        state.error = action.payload.message;
      }
    },
    [deleteUser.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [updateUser.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [updateUser.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = {
          message: action.payload.message,
          success: action.payload.success,
        };
      }
    },
    [updateUser.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = {
          message: action.payload.message,
          success: action.payload.success,
        };
      }
    },
  },
});
const { actions, reducer } = AuthSlice;

export const selectUsers = (state) => state.users.entities;
export const selectTargetUser = (state) => state.users.targetSser;

export const {} = actions;
export default reducer;
