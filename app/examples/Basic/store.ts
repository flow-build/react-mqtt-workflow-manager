import { configureStore } from '@reduxjs/toolkit';

import { workflowManagerReducer } from '../../../dist';

export const store = configureStore({
  reducer: { workflowManagerReducer },
  devTools: process.env.NODE_ENV !== 'production',
});
