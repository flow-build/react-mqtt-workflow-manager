import * as React from 'react';

import { useMqtt, useSubscribe } from '../../../dist';

const processId = '7179b2f3-5236-4917-8164-f02fc43cfb07';
const processTopic = `/process/7179b2f3-5236-4917-8164-f02fc43cfb07/am/create`;
const actorTopic = `/actor/7179b2f3-5236-4917-8164-f02fc43cfb07/am/create`;

export const Child: React.FC = () => {
  const { status, error } = useMqtt();
  const subscribe = useSubscribe();

  React.useEffect(() => {
    if (status === 'connected')
      subscribe([processTopic, actorTopic], processId);
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
