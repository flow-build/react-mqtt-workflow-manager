export const VALID_TOPIC_PATTERN =
  /^(([\\+#]{1}|[^\\+#]*)\/)?(([\\+#]{1}|[^\\+#]*)\/{1})*(([\\+#]{1}|[^\\+#]*))$/;

export const ERROR_MESSAGES = {
  NO_WRAPPER:
    'No context found. Did you forget to wrap your app with WorkflowManager component?',
  NO_VALID_TOPICS:
    'Invalid MQTT topic(s) pattern(s). Please check your topics in the subscribe method.',
  ERROR_OCURRED: 'An error occurred in MQTT client.',
  NOT_CONNECTED: 'MQTT client is not connected.',
  FAILED_TO_CONNECT:
    'Failed to connect to MQTT broker. Please, check your connection settings.',
  NO_STORE: 'No store found. Did you forget to set the store?',
  INVALID_JSON: 'The MQTT message is not a valid JSON.',
};

export const PROCESS_TOPIC_PATTERN = '/process/+processId/am/create';
