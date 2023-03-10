import * as React from 'react';

import { useMqtt, useSubscribe } from '../../../dist';
import { processTopic, actorTopic } from './constants';

export const Child: React.FC = () => {
  const { status, error } = useMqtt();
  const subscribe = useSubscribe();

  React.useEffect(() => {
    if (status === 'connected') subscribe([processTopic, actorTopic]);
  }, [subscribe, status]);

  return (
    <main>
      <h1>This is a basic example</h1>
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
