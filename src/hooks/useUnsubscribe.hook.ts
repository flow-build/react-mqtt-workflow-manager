import { useMemo } from 'react';

import { WorkflowManagerConfig } from '..';

/**
 * @description Subscribe to a topic or topics.
 */
export const useUnsubscribe = () => {
  return useMemo(() => WorkflowManagerConfig.unsubscribe, []);
};
