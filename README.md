
# React MQTT Workflow Manager

React MQTT Workflow Manager is a React component library designed to wrap all MQTT pub/sub logic behind the scenes. This manager comunicates with your broker to dispatch actions in your front-end application. The library also was designed to work with [Workflow API Layer](https://github.com/flow-build/workflow-api).


## Installation

```bash
npm install @flowbuild/react-mqtt-workflow-manager --save
```
or

```bash
yarn add @flowbuild/react-mqtt-workflow-manager
```
## Dependencies

The `WorkflowManager` component [peer depends](https://docs.npmjs.com/files/package.json#peerdependencies) on the [React](https://www.npmjs.com/package/react) and [React DOM](https://www.npmjs.com/package/react-dom) in version 18.

```bash
npm i react@18 react-dom@18
```
## Usage


1. Wrap you application with ``WorkflowManager`` component. Don't forget to set your store with ``WorkflowManagerConfig.setStore`` before the componente usage. This is important, because the library needs redux functions to work correctly.

```jsx
// App.tsx

import * as React from 'react';

import { Provider } from 'react-redux';
import { WorkflowManager, WorkflowManagerConfig } from '@flowbuild/react-mqtt-workflow-manager';

import { store } from './store'; // Your redux store


WorkflowManagerConfig.setStore(store);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <WorkflowManager
        brokerUrl="ws://broker.mqttdashboard.com:8000/mqtt"
        options={{
          clientId: `clientId-${Math.random().toString(36).substring(2, 9)}`,
          keepalive: 60,
        }}
      >
        {/* Your child component here */}
      </WorkflowManager>
    </Provider>
  );
};
```

## Properties

Property          | Type             | Required             | Description
---               | ---              | ---                  | ---
`brokerUrl`       | *string*         | false                | URL to connect to broker. Use full URL like ws://
`options`         | *IClientOptions* | false                | MQTT client options. See [MQTT.js](https://github.com/mqttjs/MQTT.js/blob/main/types/lib/client-options.d.ts).


## Running locally

Clone o projeto

```bash
git clone https://github.com/flow-build/react-mqtt-workflow-manager.git
```

Entre no diretório do projeto

```bash
cd react-mqtt-workflow-manager
```

Instale as dependências

```bash
npm install
```

Inicie o servidor

```bash
npm run dev
```

```bash
cd app
```

```bash
npm install
```

```bash
npm run start
```


## Authors

[@wallace-sf](https://www.github.com/wallace-sf)


## License

[MIT](https://choosealicense.com/licenses/mit/)

