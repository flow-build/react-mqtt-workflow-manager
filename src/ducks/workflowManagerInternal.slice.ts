import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WorkflowManagerState } from './types';

const Types = {
  addProcess: 'ADD_PROCESS',
  removeProcess: 'REMOVE_PROCESS',
};

const initialState: WorkflowManagerState = {
  activeProcesses: [],
};

export const workflowManagerInternalSlice = createSlice({
  name: '@@workflowManagerInternal',
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

export const addProcess =
  workflowManagerInternalSlice.actions[Types.addProcess];
export const removeProcess =
  workflowManagerInternalSlice.actions[Types.removeProcess];

export default workflowManagerInternalSlice.reducer;
