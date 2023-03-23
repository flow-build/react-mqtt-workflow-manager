import { configureStore, createSlice } from '@reduxjs/toolkit';

import { workflowManagerReducer } from '../../../dist';

const basicSlice = createSlice({
  name: '@basic',
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: { workflowManagerReducer, basic: basicSlice.reducer },
  devTools: process.env.NODE_ENV !== 'production',
});
