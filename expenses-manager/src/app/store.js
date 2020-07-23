import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/AuthSlice'
import balanceReducer from '../features/Payments/BalanceSlice'
import userReducer from '../features/users/UsersSlice'
import groupsRducer from '../features/groups/GroupSlice'
import loadingReducer from '../features/loading/loadingSlice'
import kickstarterReducer from '../features/kickstarters/kickstarterSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    users: userReducer,
    groups: groupsRducer,
    loading: loadingReducer,
    kickstarters: kickstarterReducer
  },
});
