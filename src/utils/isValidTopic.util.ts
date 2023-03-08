import { VALID_TOPIC_PATTERN } from './constants';

export const isValidTopic = (topic: string): boolean => {
  return VALID_TOPIC_PATTERN.test(topic);
};
