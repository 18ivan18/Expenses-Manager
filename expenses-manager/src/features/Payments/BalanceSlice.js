import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExpensesAPI from "../../API/ExpensesAPI";

export const getIncomes = createAsyncThunk(
  "balance/getincomes",
  async (auth) => {
    return ExpensesAPI.findAllincomes(auth);
  }
);

export const getPayments = createAsyncThunk(
  "balance/getPayments",
  async (auth) => {
    return ExpensesAPI.findAllPayments(auth);
  }
);

export const postNewIncome = createAsyncThunk(
  "balance/postNewIncome",
  async ({
    auth,
    formData,
    expense,
    date,
    userID,
    category,
    categoryPicture,
  }) => {
    return ExpensesAPI.createIncome(
      {
        type: expense ? "payment" : "income",
        category: category,
        amount: formData.amount,
        description: formData.description,
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        userID: userID ? userID : "",
        categoryPicture: categoryPicture,
      },
      auth
    );
  }
);

const BalanceSlice = createSlice({
  name: "balance",
  initialState: {
    incomes: [],
    payments: [],
    categorys: undefined,
    paymentsCategories: undefined,
    message: "",
  },
  reducers: {
    clearMessage: (state, action) => {
      state.message = undefined;
    },
  },
  extraReducers: {
    [getIncomes.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.incomes = action.payload.result;
        const unique = [];
        const distinct = [];
        const array = action.payload.result.map((inc) => {
          return { name: inc.category, picture: inc.categoryPicture };
        });
        for (let i = 0; i < array.length; i++) {
          if (!unique[array[i].name]) {
            distinct.push(array[i]);
            unique[array[i].name] = 1;
          }
        }
        state.categorys = distinct;
      }
    },
    [getIncomes.rejected]: (state, action) => {
      console.log(action.error);
    },
    [getPayments.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.payments = action.payload.result;
        const unique = [];
        const distinct = [];
        const array = action.payload.result.map((inc) => {
          return { name: inc.category, picture: inc.categoryPicture };
        });
        for (let i = 0; i < array.length; i++) {
          if (!unique[array[i].name]) {
            distinct.push(array[i]);
            unique[array[i].name] = 1;
          }
        }
        state.paymentsCategories = distinct;
      }
    },
    [getPayments.rejected]: (state, action) => {
      console.log(action.error);
    },
    [postNewIncome.fulfilled]: (state, action) => {
      state.message = action.payload.message;
    },
    [postNewIncome.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});
const { actions, reducer } = BalanceSlice;

export const selectIncomes = (state) => state.balance.incomes;
export const selectPayments = (state) => state.balance.payments;
export const selectMessage = (state) => state.balance.message;

export const { clearMessage } = actions;
export default reducer;
