import { Store } from '@reduxjs/toolkit';
import { matches, exec } from 'mqtt-pattern';
import { MqttClient, IClientSubscribeOptions } from 'precompiled-mqtt';
import invariant from 'tiny-warning';

import { createWorkflowAction } from './ducks/utils';
import { addProcess, removeProcess } from './ducks/workflowManager.slice';
import { WorkflowManagerConfigProps } from './types';
import {
  ERROR_MESSAGES,
  isValidJSON,
  shouldSubscribeOrUnsubscribe,
  PROCESS_TOPIC_PATTERN,
} from './utils';

class WorkflowManagerConfig implements WorkflowManagerConfigProps {
  private static _client: MqttClient | null = null;
  private static _store: Store | null = null;
  private static _instance = new WorkflowManagerConfig();

  constructor() {
    this._setInstance(this);
    this.subscribe = this.subscribe.bind(this);
  }

  private _setInstance(instance: WorkflowManagerConfig): void {
    if (!WorkflowManagerConfig._instance) {
      WorkflowManagerConfig._instance = instance;
    }
  }

  private _onMessageArrived(subscribeTopic: string | string[]) {
    return (topic: string, message: Buffer) => {
      const payloadString = message.toString();

      if (!isValidJSON(payloadString)) {
        invariant(false, ERROR_MESSAGES.INVALID_JSON);
        return;
      }

      const topics = [subscribeTopic].flat();
      const isMatched = topics.some((subTopic) => matches(subTopic, topic));

      if (isMatched) {
        const store = WorkflowManagerConfig._store;
        const dispatch = store?.dispatch as Store['dispatch'];
        const payload = JSON.parse(message.toString());
        const action = payload?.props?.action || '';
        const result = payload?.props?.result || {};

        dispatch(createWorkflowAction(action, result));
      }
    };
  }

  public static getInstance(): Readonly<WorkflowManagerConfig> {
    return Object.freeze(WorkflowManagerConfig._instance);
  }

  public static setMqttClient(client: MqttClient): void {
    this._client = client;
  }

  public static getStore(): Store | null {
    return this._store;
  }

  /**
   * @description Set the redux store. This is used to dispatch actions in the workflow manager.
   * @param {Store} store
   * @returns {void}
   */
  public setStore(store: Store): void {
    WorkflowManagerConfig._store = store;
  }

  /**
   * @description The MQTT Client instance is intended for external react component. Be sure to use this after de WorkflowManager component has been mounted.
   * @returns {MqttClient | null}
   */
  public getMqttClient(): MqttClient | null {
    return WorkflowManagerConfig._client;
  }

  /**
   * @description Subscribe to a topic or topics.
   * @param {(string | string[])} topic
   * @param {IClientSubscribeOptions} options
   */
  public subscribe(
    topic: string | string[],
    options: IClientSubscribeOptions = {} as IClientSubscribeOptions,
  ): void {
    const client = this.getMqttClient();
    const store = WorkflowManagerConfig._store;

    const shouldSubscribe = shouldSubscribeOrUnsubscribe(topic, store, client);

    if (!shouldSubscribe) return;

    const dispatch = store?.dispatch as Store['dispatch'];

    const topics = [topic].flat();

    topics.forEach((subTopic) => {
      const topicParams = exec(PROCESS_TOPIC_PATTERN, subTopic);
      const processId = topicParams?.processId || '';

      if (processId) dispatch(addProcess(processId));
    });

    client?.subscribe(topic, options);
    client?.on('message', this._onMessageArrived(topic));
  }

  public unsubscribe(topic: string | string[]): void {
    const client = this.getMqttClient();
    const store = WorkflowManagerConfig._store;

    const unsubscribe = shouldSubscribeOrUnsubscribe(topic, store, client);

    if (!unsubscribe) return;

    const dispatch = store?.dispatch as Store['dispatch'];
    const topics = [topic].flat();

    client?.unsubscribe(topic);
    topics.forEach((subTopic) => {
      dispatch(removeProcess(subTopic));
    });
  }
}

export default WorkflowManagerConfig;
