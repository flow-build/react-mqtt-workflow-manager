import { configureStore } from '@reduxjs/toolkit';

import { workflowManagerReducer } from '../src';

export const store = configureStore({
  reducer: { workflowManagerReducer },
});
