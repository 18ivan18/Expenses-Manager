import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/AuthSlice'

export default configureStore({
  reducer: {
    auth: authReducer
  },
});
