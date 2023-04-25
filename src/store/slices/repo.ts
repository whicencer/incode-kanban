import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepo } from '../../typings/IRepo';

interface Repo {
  issues: IRepo;
  name: string;
  owner: string;
}

const initialState: Repo = {
  issues: null,
  name: '',
  owner: ''
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setCurrentRepo(state, action: PayloadAction<Repo>) {
      state.issues = action.payload.issues;
      state.owner = action.payload.owner;
      state.name = action.payload.name;
    }
  }
});

export const { setCurrentRepo } = repoSlice.actions;
export default repoSlice.reducer;