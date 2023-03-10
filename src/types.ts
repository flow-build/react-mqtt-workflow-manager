import { PropsWithChildren } from 'react';

import { Store } from '@reduxjs/toolkit';
import {
  IClientOptions,
  IClientSubscribeOptions,
  MqttClient,
} from 'precompiled-mqtt';

type Topic = string | string[];

export type IClientUnsubscribeOptions = Parameters<
  MqttClient['unsubscribe']
>[1];

export interface WorkflowManagerProps extends PropsWithChildren {
  brokerUrl?: string;
  options?: IClientOptions;
}

export interface WorkflowManagerConfigProps {
  setStore(store: Store): void;
  getMqttClient(): MqttClient | null;
  subscribe(topic: Topic, options: IClientSubscribeOptions): void;
  unsubscribe(topic: Topic, options: IClientUnsubscribeOptions): void;
}
