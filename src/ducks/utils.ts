import { createAction } from '@reduxjs/toolkit';

import { WORFLOW_MANAGER_EXTERNAL_PREFFIX } from '.';

export const createWorkflowAction = (
  workflowAction: string,
  payload: Record<string, unknown>,
) => {
  const actionName = `${WORFLOW_MANAGER_EXTERNAL_PREFFIX}/${workflowAction}`;

  return createAction<typeof payload>(actionName)(payload);
};
