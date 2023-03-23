import * as React from 'react';

import { useMqtt, useSubscribe, useUnsubscribe } from '../../../dist';
import { processTopic, actorTopic } from './constants';

const topics = [processTopic, actorTopic];

export const Child: React.FC = () => {
  const { status, error } = useMqtt();
  const subscribe = useSubscribe();
  const unsubscribe = useUnsubscribe();

  const handleSubscribe = React.useCallback(() => {
    if (status === 'connected') subscribe(topics);
  }, [status, subscribe]);

  const handleUnsubscribe = React.useCallback(() => {
    if (status === 'connected') unsubscribe(topics);
  }, [status, unsubscribe]);

  return (
    <main>
      <h1>This is a basic example</h1>
      <h2>Topics</h2>
      <p>{topics.join(', ')}</p>
      <button type="button" onClick={handleSubscribe}>
        Inscrever-se nos tópicos
      </button>
      <button type="button" onClick={handleUnsubscribe}>
        Desinscrever-se dos tópicos
      </button>
      <p>
        <b>Mqtt status: </b>
        {status}
      </p>
      <p>
        <b>Error: </b>
        {String(error)}
      </p>
    </main>
  );
};
