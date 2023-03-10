import React, { FC, useCallback, useEffect, useState } from 'react';

import { connect, MqttClient } from 'precompiled-mqtt';

import { WorkflowManagerProps } from './types';

export const WorkflowManager: FC<WorkflowManagerProps> = ({
  brokerUrl,
  options,
  children,
}) => {
  const [client, setClient] = useState<MqttClient | null>(null);

  const init = useCallback(() => {
    if (client === null) {
      try {
        const mqttInstance = connect(brokerUrl, options);

        setClient(mqttInstance);
      } catch (error) {
        // TODO: Handle error with invariant
      }
    }
  }, [brokerUrl, client, options]);

  useEffect(() => {
    init();
  }, [init]);

  return <>{children}</>;
};
