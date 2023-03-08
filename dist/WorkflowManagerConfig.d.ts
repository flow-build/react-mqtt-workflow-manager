import { Store } from '@reduxjs/toolkit';
import { MqttClient, IClientSubscribeOptions } from 'precompiled-mqtt';
import { WorkflowManagerConfigProps } from './types';
declare class WorkflowManagerConfig implements WorkflowManagerConfigProps {
    private static _client;
    private static _store;
    private static _instance;
    constructor();
    private _setInstance;
    private _onMessageArrived;
    static getInstance(): Readonly<WorkflowManagerConfig>;
    static setMqttClient(client: MqttClient): void;
    static getStore(): Store | null;
    /**
     * @description Set the redux store. This is used to dispatch actions in the workflow manager.
     * @param {Store} store
     * @returns {void}
     */
    setStore(store: Store): void;
    /**
     * @description The MQTT Client instance is intended for external react component. Be sure to use this after de WorkflowManager component has been mounted.
     * @returns {MqttClient | null}
     */
    getMqttClient(): MqttClient | null;
    /**
     * @description Subscribe to a topic or topics.
     * @param {(string | string[])} topic
     * @param {IClientSubscribeOptions} options
     */
    subscribe(topic: string | string[], options?: IClientSubscribeOptions): void;
    unsubscribe(topic: string | string[]): void;
}
export default WorkflowManagerConfig;
