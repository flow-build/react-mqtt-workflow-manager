import { createAction } from '@reduxjs/toolkit';

import { prefix } from '.';

export const createWorkflowAction = (
  workflowAction: string,
  payload: Record<string, unknown>,
) => {
  const actionName = `${prefix}/${workflowAction}`;

  return createAction<typeof payload>(actionName)(payload);
};
