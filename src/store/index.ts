import { configureStore } from '@reduxjs/toolkit';
import repoSlice from './slices/repo';

export const store = configureStore({
  reducer: {
    repo: repoSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;