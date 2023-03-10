import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { MqttClient, connect } from 'precompiled-mqtt';
import invariant from 'tiny-warning';

import { MqttProvider, IMqttContext } from './contexts';
import { WorkflowManagerProps } from './types';
import { ERROR_MESSAGES } from './utils';
import WorkflowManagerConfig from './WorkflowManagerConfig';

export const WorkflowManager: FC<WorkflowManagerProps> = ({
  brokerUrl = '',
  options,
  children,
}) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [status, setStatus] = useState<IMqttContext['status']>('offline');
  const [error, setError] = useState<IMqttContext['error']>(null);

  const init = useCallback(() => {
    if (!client) {
      try {
        const mqttInstance = connect(brokerUrl, options);

        mqttInstance.on('connect', () => {
          setStatus('connected');
        });

        mqttInstance.on('end', () => {
          setStatus('offline');
        });

        mqttInstance.on('offline', () => {
          setStatus('offline');
        });

        mqttInstance.on('error', () => {
          setStatus('error');
          invariant(false, ERROR_MESSAGES.ERROR_OCURRED);
        });

        mqttInstance.on('reconnect', () => {
          setStatus('reconnecting');
        });

        setClient(mqttInstance);
        WorkflowManagerConfig.setMqttClient(mqttInstance);
      } catch (error) {
        setStatus('error');
        setError(error as Error);
        invariant(false, ERROR_MESSAGES.FAILED_TO_CONNECT);
      }
    }
  }, [brokerUrl, options, client]);

  useEffect(() => {
    init();
  }, [init]);

  const providerValue = useMemo(() => {
    return { client, status, error };
  }, [client, status, error]);

  return <MqttProvider value={providerValue}>{children}</MqttProvider>;
};
