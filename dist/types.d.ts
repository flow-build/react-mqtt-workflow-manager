import { PropsWithChildren } from 'react';
import { Store } from '@reduxjs/toolkit';
import { IClientOptions, IClientSubscribeOptions, MqttClient } from 'precompiled-mqtt';
export interface WorkflowManagerProps extends PropsWithChildren {
    brokerUrl?: string;
    options?: IClientOptions;
}
export interface WorkflowManagerConfigProps {
    setStore(store: Store): void;
    getMqttClient(): MqttClient | null;
    subscribe(topic: string | string[], options: IClientSubscribeOptions): void;
    unsubscribe(topic: string | string[]): void;
}
