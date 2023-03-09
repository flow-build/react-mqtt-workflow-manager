import { configureStore, createSlice, Middleware } from '@reduxjs/toolkit';

import { workflowManagerReducer, WorkflowManagerConfig } from '../../../dist';
import { processTopic, actorTopic } from './constants';

const middleware: Middleware = () => (next) => (action) => {
  next(action);

  if (action.type === '@@workflowManager/external/TEST_WORKFLOW') {
    WorkflowManagerConfig.unsubscribe([processTopic, actorTopic]);
  }
};

const basicSlice = createSlice({
  name: '@basic',
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: { workflowManagerReducer, basic: basicSlice.reducer },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [middleware],
});
