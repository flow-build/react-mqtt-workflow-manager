import { PropsWithChildren } from 'react';

import { Store } from '@reduxjs/toolkit';
import { IClientOptions, IClientSubscribeOptions, MqttClient } from 'mqtt';

export interface WorkflowManagerProps extends PropsWithChildren {
  brokerUrl?: string;
  options?: IClientOptions;
}

export interface WorkflowManagerConfigProps {
  setStore(store: Store): void;
  getMqttClient(): MqttClient | null;
  // eslint-disable-next-line prettier/prettier
  subscribe(
    topic: string | string[],
    processId: string,
    options: IClientSubscribeOptions,
  ): void;
  unsubscribe(topic: string | string[]): void;
}
