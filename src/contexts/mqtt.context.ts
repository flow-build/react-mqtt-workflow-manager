import { createContext } from 'react';

import { IMqttContext } from './types';

export const MqttContext = createContext<IMqttContext | undefined>(undefined);

export const MqttProvider = MqttContext.Provider;
