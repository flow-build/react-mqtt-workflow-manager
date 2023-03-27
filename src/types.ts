import { Store } from '@reduxjs/toolkit';
import {
  IClientOptions,
  IClientSubscribeOptions,
  MqttClient,
} from 'mqtt-browser';

type Topic = string | string[];

export type IClientUnsubscribeOptions = Parameters<
  MqttClient['unsubscribe']
>[1];

export interface WorkflowManagerProps {
  brokerUrl: string;
  options?: IClientOptions;
  children: React.ReactNode;
}

export interface WorkflowManagerConfigProps {
  setStore(store: Store): void;
  getMqttClient(): MqttClient | null;
  subscribe(topic: Topic, options: IClientSubscribeOptions): void;
  unsubscribe(topic: Topic, options: IClientUnsubscribeOptions): void;
}
