import { MqttClient } from 'mqtt-browser';
export interface MqttClientExtended extends MqttClient {
  messageIdToTopic: Record<string, string[]>;
}
