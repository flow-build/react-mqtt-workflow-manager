import { VALID_TOPIC_PATTERN } from './constants.util';

export const isValidTopic = (topic: string): boolean => {
  return VALID_TOPIC_PATTERN.test(topic);
};
