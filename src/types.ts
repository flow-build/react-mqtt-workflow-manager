import { PropsWithChildren } from 'react';

import { IClientOptions } from 'mqtt';
export interface WorkflowManagerProps extends PropsWithChildren {
  brokerUrl: string;
  options?: IClientOptions;
}
