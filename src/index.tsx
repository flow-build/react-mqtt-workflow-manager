import Config from './WorkflowManagerConfig';

export * from './WorkflowManager';
export * from './hooks';
export * from './types';
export * from './ducks';

export const WorkflowManagerConfig = Config.getInstance();
