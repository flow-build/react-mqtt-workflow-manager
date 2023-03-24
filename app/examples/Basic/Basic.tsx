import * as React from 'react';
import { Provider } from 'react-redux';

import { WorkflowManager, WorkflowManagerConfig } from '../../../dist';
import { Child } from './Child';
import { store } from './store';
import { createClientId } from './utils';

WorkflowManagerConfig.setStore(store);

export const Basic: React.FC = () => {
  return (
    <Provider store={store}>
      <WorkflowManager
        brokerUrl="ws://broker.mqttdashboard.com:8000/mqtt"
        options={{
          clientId: createClientId(),
          keepalive: 60,
        }}
      >
        <Child />
      </WorkflowManager>
    </Provider>
  );
};
