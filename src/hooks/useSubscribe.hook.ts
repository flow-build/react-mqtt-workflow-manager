import { useMemo } from 'react';

import { Instance } from '../WorkflowManagerConfig';

/**
 * @description Subscribe to a topic or topics.
 */
export const useSubscribe = () => {
  return useMemo(() => Instance.subscribe, []);
};
