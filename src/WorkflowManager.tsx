import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MqttClient, connect } from 'mqtt-browser';
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
  const connectionOpen = useRef(false);

  const [client, setClient] = useState<MqttClient | null>(null);
  const [status, setStatus] = useState<IMqttContext['status']>('offline');
  const [error, setError] = useState<IMqttContext['error']>(null);

  const init = useCallback(() => {
    if (!client && !connectionOpen.current) {
      connectionOpen.current = true;

      try {
        const mqttInstance = connect(brokerUrl, options);

        mqttInstance.on('connect', () => {
          if (status !== 'connected') setStatus('connected');
        });

        mqttInstance.on('end', () => {
          if (status !== 'offline') setStatus('offline');
        });

        mqttInstance.on('offline', () => {
          if (status !== 'offline') setStatus('offline');
        });

        mqttInstance.on('error', () => {
          if (status !== 'error') setStatus('error');
          setError(new Error(ERROR_MESSAGES.ERROR_OCURRED));
          invariant(false, ERROR_MESSAGES.ERROR_OCURRED);
        });

        mqttInstance.on('reconnect', () => {
          if (status !== 'reconnecting') setStatus('reconnecting');
        });

        setClient(mqttInstance);
        WorkflowManagerConfig.setMqttClient(mqttInstance);
      } catch (error) {
        setStatus('error');
        setError(error as Error);
        invariant(false, ERROR_MESSAGES.FAILED_TO_CONNECT);
      }
    }
  }, [brokerUrl, options, client, status]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    return () => {
      if (client) {
        client.end();
        setClient(null);

        connectionOpen.current = false;
      }
    };
  }, [client]);

  const providerValue = useMemo(() => {
    return { client, status, error };
  }, [client, status, error]);

  return <MqttProvider value={providerValue}>{children}</MqttProvider>;
};
