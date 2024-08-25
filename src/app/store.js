import { configureStore } from '@reduxjs/toolkit';
import bfhlReducer from '../features/bfhl/bfhlSlice'

export const store = configureStore({
  reducer: {
    bfhl: bfhlReducer,
  },
});
