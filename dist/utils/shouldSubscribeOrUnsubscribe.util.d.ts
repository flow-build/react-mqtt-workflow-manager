import { Store } from '@reduxjs/toolkit';
import { MqttClient } from 'precompiled-mqtt';
export declare const shouldSubscribeOrUnsubscribe: (topics: string | string[], store: Store | null, client: MqttClient | null) => boolean | undefined;
