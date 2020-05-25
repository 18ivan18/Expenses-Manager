import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../../utils/storage";

export const validateUser = createAsyncThunk(
  "authentication/validateUser",
  async (callback) => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
            const { token } = obj;
      const response = await fetch(
        "http://192.168.100.11:8080/api/account/verify",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return await response.json();
      
    }
  }
);

const AuthSlice = createSlice({
  name: "authentication",
  initialState: {
    loggedIn: false,
    user: {},
    loading: false,
    token: "",
  },
  reducers: {
    login: (state, input) => {
      // console.log(input)
      state.loggedIn = input.payload.loggedIn;
      state.user = input.payload.user;
      state.token = input.payload.token;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    [validateUser.pending]: (state, action) => {
    if (state.loading === false) {
      state.loading = true
    }
  },
    // you can mutate state directly, since it is using immer behind the scenes
    [validateUser.fulfilled]: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.loggedIn = action.payload.success;
        state.message = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      }
    },
    [validateUser.rejected]: (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.message = action.payload.message
    },
  },
});
const { actions, reducer } = AuthSlice;

export const selectAuth = (state) => state.auth;

export const { login, setLoading } = actions;
export default reducer;
