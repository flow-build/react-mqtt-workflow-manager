import { useMemo } from 'react';

import { Instance } from '../WorkflowManagerConfig';

/**
 * @description Subscribe to a topic or topics.
 */
export const useUnsubscribe = () => {
  return useMemo(() => Instance.unsubscribe, []);
};
