import { useMemo } from 'react';

import { WorkflowManagerConfig } from '..';

/**
 * @description Subscribe to a topic or topics.
 */
export const useSubscribe = () => {
  return useMemo(() => WorkflowManagerConfig.subscribe, []);
};
