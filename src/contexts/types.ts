import { MqttClient } from 'precompiled-mqtt';

export interface IMqttContext {
  client: MqttClient | null;
  status:
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'reconnecting'
    | 'offline'
    | 'error';
  error: Error | null;
}
