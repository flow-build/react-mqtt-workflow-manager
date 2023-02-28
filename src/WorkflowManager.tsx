import React, { FC } from 'react';

import { WorkflowManagerProps } from './types';

export const WorkflowManager: FC<WorkflowManagerProps> = ({ children }) => {
  return <div>{children || `Hello WorkflowManager`}</div>;
};
