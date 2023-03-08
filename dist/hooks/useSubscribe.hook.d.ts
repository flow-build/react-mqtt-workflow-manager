/**
 * @description Subscribe to a topic or topics.
 */
export declare const useSubscribe: () => (topic: string | string[], processId: string, options?: import("mqtt").IClientSubscribeOptions) => void;
