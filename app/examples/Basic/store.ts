import { configureStore, createSlice } from '@reduxjs/toolkit';

import { workflowManagerInternalReducer } from '../../../dist';

const basicSlice = createSlice({
  name: '@basic',
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: { workflowManagerInternalReducer, basic: basicSlice.reducer },
  devTools: process.env.NODE_ENV !== 'production',
});
