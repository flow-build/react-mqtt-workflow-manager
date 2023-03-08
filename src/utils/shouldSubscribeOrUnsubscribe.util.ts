import { Store } from '@reduxjs/toolkit';
import { MqttClient } from 'mqtt';
import invariant from 'tiny-warning';

import { ERROR_MESSAGES } from './constants';
import { isValidTopic } from './isValidTopic.util';

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

const hasAllValidTopics = (topics: string | string[]) => {
  const isValid = Array.isArray(topics)
    ? topics.every((topic) => isValidTopic(topic))
    : isValidTopic(topics);

  if (!isValid) invariant(false, ERROR_MESSAGES.NO_VALID_TOPICS);

  return isValid;
};

export const shouldSubscribeOrUnsubscribe = (
  topics: string | string[],
  store: Store | null,
  client: MqttClient | null,
) => {
  return (
    hasAllValidTopics(topics) && hasStore(store) && isClientConnected(client)
  );
};
