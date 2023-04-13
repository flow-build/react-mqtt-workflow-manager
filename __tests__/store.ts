import { configureStore } from '@reduxjs/toolkit';

import { workflowManagerInternalReducer } from '../src';

export const store = configureStore({
  reducer: { workflowManagerInternalReducer },
});
