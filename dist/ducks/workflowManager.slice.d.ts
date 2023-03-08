import { PayloadAction } from '@reduxjs/toolkit';
import { WorkflowManagerState } from './types';
export declare const workflowManagerSlice: import("@reduxjs/toolkit").Slice<WorkflowManagerState, {
    [x: string]: (state: import("immer/dist/internal").WritableDraft<WorkflowManagerState>, action: PayloadAction<string>) => void;
}, "@@workflowManager">;
export declare const prefix: "@@workflowManager";
export declare const addProcess: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>;
export declare const removeProcess: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>;
declare const _default: import("redux").Reducer<WorkflowManagerState, import("redux").AnyAction>;
export default _default;
