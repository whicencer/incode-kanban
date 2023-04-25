import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepo } from '../../typings/IRepo';

interface Repo {
  currentRepo: IRepo
}

const initialState: Repo = {
  currentRepo: null
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setCurrentRepo(state, action: PayloadAction<IRepo>) {
      state.currentRepo = action.payload;
    }
  }
});

export const { setCurrentRepo } = repoSlice.actions;
export default repoSlice.reducer;