import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WorkflowManagerState } from './types';

const Types = {
  addProcess: 'internal/ADD_PROCESS',
  removeProcess: 'internal/REMOVE_PROCESS',
};

const initialState: WorkflowManagerState = {
  activeProcesses: [],
};

export const workflowManagerSlice = createSlice({
  name: '@@workflowManager',
  initialState,
  reducers: {
    [Types.addProcess]: (state, action: PayloadAction<string>) => {
      state.activeProcesses.push(action.payload);
    },
    [Types.removeProcess]: (state, action: PayloadAction<string>) => {
      state.activeProcesses = state.activeProcesses.filter(
        (process) => process !== action.payload,
      );
    },
  },
});

export const prefix = workflowManagerSlice.name;
export const addProcess = workflowManagerSlice.actions[Types.addProcess];
export const removeProcess = workflowManagerSlice.actions[Types.removeProcess];

export default workflowManagerSlice.reducer;
