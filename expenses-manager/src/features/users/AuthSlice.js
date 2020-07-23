import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../../utils/storage";
import ExpensesAPI from "../../API/ExpensesAPI";

export const validateUser = createAsyncThunk(
  "authentication/validateUser",
  async () => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      return ExpensesAPI.validateUser(token);
    }
  }
);

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async (credentials) => {
    return ExpensesAPI.login(credentials);
  }
);

export const logoutUser = createAsyncThunk(
  "authentication/logoutUser",
  async (cb) => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      return ExpensesAPI.logout(token);
    }
  }
);

const AuthSlice = createSlice({
  name: "authentication",
  initialState: {
    loggedIn: false,
    user: null,
    token: null,
    message: "",
  },
  reducers: {
    clearMessage: (state, action) => {
      state.message = ""
    }
  },
  extraReducers: {
    // you can mutate state directly, since it is using immer behind the scenes
    [validateUser.fulfilled]: (state, action) => {
      state.loggedIn = action.payload.success;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [validateUser.rejected]: (state, action) => {
      console.log(action.payload)
      state.message = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loggedIn = action.payload.success;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.message;
    },
    [loginUser.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    [logoutUser.fulfilled]: (state, action) => {
      if(action.payload.success) {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.message = action.payload.message;
      }
    },
    [logoutUser.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    
  },
});
const { actions, reducer } = AuthSlice;

export const selectAuth = (state) => state.auth;

export const { clearMessage } = actions;
export default reducer;
