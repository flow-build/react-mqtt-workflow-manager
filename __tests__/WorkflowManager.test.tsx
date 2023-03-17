import React, { PropsWithChildren } from 'react';

import { renderHook, act, waitFor } from '@testing-library/react';

import {
  WorkflowManager,
  WorkflowManagerConfig,
  useMqtt,
  useSubscribe,
  useUnsubscribe,
} from '../src';
import { store } from './store';
import { MqttClientExtended } from './types';

const props = {
  brokerUrl: 'ws://broker.mqttdashboard.com:8000/mqtt',
  options: {
    clientId: `clientId-${Math.random().toString(16).substring(2, 8)}`,
    reconnectPeriod: 1000,
  },
};

let wrapper: React.FC<PropsWithChildren>;

describe('WorkflowManager component', () => {
  beforeEach(() => {
    WorkflowManagerConfig.setStore(store);

    wrapper = ({ children }) => (
      <WorkflowManager {...props}>{children}</WorkflowManager>
    );
  });

  it('should connect with mqtt', async () => {
    const { result } = renderHook(() => useMqtt(), { wrapper });

    await waitFor(
      () => {
        const status = result.current?.status;
        return expect(status === 'connected').toBe(true);
      },
      { timeout: 2000 },
    );

    expect(result.current?.status).toBe('connected');

    await act(async () => {
      result.current.client?.end();
    });
  });

  it('should not connect with mqtt: invalid broker url', async () => {
    const { result } = renderHook(() => useMqtt(), {
      wrapper: ({ children }) => (
        <WorkflowManager
          brokerUrl="ws://broker.mqttdashboard@@.com:8000/mqtt"
          options={{ ...props.options, connectTimeout: 2000 }}
        >
          {children}
        </WorkflowManager>
      ),
    });

    await waitFor(
      () => {
        const status = result.current?.status;

        return expect(status === 'reconnecting').toBe(true);
      },
      { timeout: 2000 },
    );

    expect(result.current?.status).toBe('reconnecting');

    await act(async () => {
      result.current.client?.end();
    });
  });

  it('should subscribe to topics', async () => {
    const { result: resultSub } = renderHook(() => useSubscribe(), { wrapper });
    const { result: resultMqtt } = renderHook(() => useMqtt(), { wrapper });

    const subscribe = resultSub.current;
    const client = resultMqtt.current.client as MqttClientExtended;

    await waitFor(
      () => {
        const status = resultMqtt.current?.status;
        return expect(status === 'connected').toBe(true);
      },
      { timeout: 2000 },
    );

    expect(resultMqtt.current.status).toBe('connected');

    const topic = 'workflowManager/test/1';

    subscribe(topic);

    const lastMessageId = client?.getLastMessageId();
    const subscribedTopics = client?.messageIdToTopic[lastMessageId];

    expect(subscribedTopics).toContain(topic);

    await act(async () => {
      client?.end();
    });
  });

  it('should unsubscribe from topics', async () => {
    const { result: resultSub } = renderHook(() => useSubscribe(), { wrapper });
    const { result: resultUnsub } = renderHook(() => useUnsubscribe(), {
      wrapper,
    });
    const { result: resultMqtt } = renderHook(() => useMqtt(), { wrapper });

    const subscribe = resultSub.current;
    const unsubscribe = resultUnsub.current;
    const client = resultMqtt.current.client as MqttClientExtended;

    await waitFor(
      () => {
        const status = resultMqtt.current?.status;
        return expect(status === 'connected').toBe(true);
      },
      { timeout: 2000 },
    );

    expect(resultMqtt.current.status).toBe('connected');

    const topic = 'workflowManager/test/1';

    subscribe(topic);

    const lastMessageId = client?.getLastMessageId();
    const subscribedTopics = client?.messageIdToTopic[lastMessageId];

    expect(subscribedTopics).toContain(topic);

    unsubscribe(topic);

    const newLastMessageId = client?.getLastMessageId();
    const newSubscribedTopics =
      client?.messageIdToTopic[newLastMessageId] || [];

    expect(newSubscribedTopics).not.toContain(topic);

    await act(async () => {
      client?.end();
    });
  });
});
