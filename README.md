
# React MQTT Workflow Manager

React MQTT Workflow Manager is a React component library designed to wrap all the [MQTT](https://mqtt.org/) sub-logic behind the scenes and must be used to work with [Workflow API Layer](https://github.com/flow-build/workflow-api). It only deals with events, not commands. The manager communicates with your broker to dispatch actions in your front-end application.

## Table of contents

 - [Installation](#installation)
 - [Dependencies](#dependencies)
 - [Usage](#usage)
 - [Example of usage](#example-of-usage)
 - [Properties](#properties)
 - [WorkflowManagerConfig](#workflowmanagerconfig)
 - [Hooks](#hooks)
 - [Running locally](#running-locally)
 - [Authors](#authors)
 - [License](#license)

## [Installation](installation)

```bash
npm install @flowbuild/react-mqtt-workflow-manager --save
```
or

```bash
yarn add @flowbuild/react-mqtt-workflow-manager
```
## [Dependencies](dependencies)

The `WorkflowManager` component [peer depends](https://docs.npmjs.com/files/package.json#peerdependencies) on the [React](https://www.npmjs.com/package/react) and [React DOM](https://www.npmjs.com/package/react-dom) in version 18.

```bash
npm i react@18 react-dom@18
```
## [Usage](usage)


1. Before using the component, set the store with `WorkflowManagerConfig.setStore`.

```tsx
// App.tsx

import * as React from 'react';

import { WorkflowManagerConfig } from '@flowbuild/react-mqtt-workflow-manager';

import { store } from './store'; // Your redux store


WorkflowManagerConfig.setStore(store);

// ...
```

2. Wrap your application with `WorkflowManager`.

```tsx
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

3. Lastly, set `workflowManagerReducer` on your store reducers.

```ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { workflowManagerReducer, WorkflowManagerConfig } from '@flowbuild/react-mqtt-workflow-manager';

const myAppSlice = createSlice({
  name: '@myApp',
  ...
});

export const store = configureStore({
  reducer: { myApp: myAppSlice.reducer, workflowManagerReducer },
});

```

## [Example of usage](example-of-usage)

A complete example of how to use it can be found [here](https://github.com/flow-build/react-mqtt-workflow-manager/tree/master/app/).

## [Properties](properties)

Property          | Type             | Required             | Description
---               | ---              | ---                  | ---
`brokerUrl`       | *string*         | true                 | URL to connect to broker. Use full URL like `wss://...`
`options`         | *IClientOptions* | false                | MQTT client options. See options config [here](https://github.com/mqttjs/MQTT.js/blob/main/types/lib/client-options.d.ts).

## [WorkflowManagerConfig](workflowmanagerconfig)

The library also provides methods and utilities for your commodity. They can be used outside the context of react components.

### setStore(store)

The library uses your redux store to dispatch actions. This is used to control and dispatch internal actions for your application.

### getMqttClient()

A utility method that can be used outside the context of react components. Be careful; the method must be able to return `null` if an error occurs when setting connect. See client config [here](https://github.com/mqttjs/MQTT.js/blob/main/README.md#client).

### subscribe(topic/topic array/topic object, [options])

Works exactly like [mqtt#subscribe](https://github.com/mqttjs/MQTT.js/blob/main/README.md#mqttclientsubscribetopictopic-arraytopic-object-options-callback), but the library implements validations and internal rules.

### subscribe(topic/topic array/topic object, [options])

Works exactly like [mqtt#unsubscribe](https://github.com/mqttjs/MQTT.js/blob/main/README.md#mqttclientunsubscribetopictopic-array-options-callback), but the library implements validations and internal rules.

## [Hooks](hooks)

Some hooks are exported for commodity.

### useMqtt()

The hook returns a object contaning `client`, `status` and `error`.

Property          | Type             | Default value    | Description
---               | ---              | ---              | ---
`client`          | *MqttClient*     | `null`           | See client [here](https://github.com/mqttjs/MQTT.js/blob/main/types/lib/client.d.ts).
`status`          | *string*         | `offline`        | `connecting`, `connected`, `disconnected`, `reconnecting`, `offline` or `error`.
`error`           | *Error*          | `null` |

### useSubscribe()

Returns `WorkflowManagerConfig.subscribe` for your commodity.

### useUnsubscribe()

Returns `WorkflowManagerConfig.unsubscribe` for your commodity.

## [Running locally](running-locally)

Clone the project

```bash
git clone https://github.com/flow-build/react-mqtt-workflow-manager.git
```

Go to the project directory

```bash
cd react-mqtt-workflow-manager
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Go to the project example directory

```bash
cd app
```

Install de example dependencies

```bash
npm install
```

Start the example application

```bash
npm run start
```


## [Authors](authors)

[@wallace-sf](https://www.github.com/wallace-sf)


## [License](license)

[MIT](https://choosealicense.com/licenses/mit/)
