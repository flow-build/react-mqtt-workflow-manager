import { Store } from '@reduxjs/toolkit';
import { MqttClient } from 'mqtt-browser';
import invariant from 'tiny-warning';

import { ERROR_MESSAGES } from './constants.util';

const hasStore = (store: Store | null) => {
  const isValid = store !== null;

  if (!isValid) invariant(false, ERROR_MESSAGES.NO_STORE);

  return isValid;
};

const isClientConnected = (client: MqttClient | null) => {
  const isValid = client?.connected;

  if (!isValid) invariant(false, ERROR_MESSAGES.NOT_CONNECTED);

  return client?.connected;
};

export const shouldSubscribeOrUnsubscribe = (
  store: Store | null,
  client: MqttClient | null,
) => {
  return hasStore(store) && isClientConnected(client);
};
