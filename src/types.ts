import { PropsWithChildren } from 'react';

import { IClientOptions } from 'precompiled-mqtt';
export interface WorkflowManagerProps extends PropsWithChildren {
  brokerUrl: string;
  options?: IClientOptions;
}
