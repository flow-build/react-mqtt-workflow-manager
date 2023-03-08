import { VALID_PATTERN } from './constants';

export const isValidTopic = (topic: string): boolean => {
  return VALID_PATTERN.test(topic);
};
