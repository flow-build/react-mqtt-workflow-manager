import { createAction } from '@reduxjs/toolkit';

import { prefix } from './workflowManager.slice';

export const createWorkflowAction = (
  workflowAction: string,
  payload: Record<string, unknown>,
) => {
  const actionName = `${prefix}/external/${workflowAction}`;

  return createAction<typeof payload>(actionName)(payload);
};
