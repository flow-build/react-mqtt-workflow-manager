import { useContext } from 'react';

import invariant from 'tiny-warning';

import { MqttContext, IMqttContext } from '../contexts';
import { ERROR_MESSAGES } from '../utils';

export const useMqtt = (): IMqttContext => {
  const context = useContext(MqttContext);

  invariant(!!context, ERROR_MESSAGES.NO_WRAPPER);

  return context as IMqttContext;
};
