'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mqttPattern = require('mqtt-pattern');
var invariant = _interopDefault(require('tiny-warning'));
var toolkit = require('@reduxjs/toolkit');
var React = require('react');
var React__default = _interopDefault(React);
var precompiledMqtt = require('precompiled-mqtt');

var _reducers;
var Types = {
  addProcess: 'internal/ADD_PROCESS',
  removeProcess: 'internal/REMOVE_PROCESS'
};
var initialState = {
  activeProcesses: []
};
var workflowManagerSlice = /*#__PURE__*/toolkit.createSlice({
  name: '@@workflowManager',
  initialState: initialState,
  reducers: (_reducers = {}, _reducers[Types.addProcess] = function (state, action) {
    state.activeProcesses.push(action.payload);
  }, _reducers[Types.removeProcess] = function (state, action) {
    state.activeProcesses = state.activeProcesses.filter(function (process) {
      return process !== action.payload;
    });
  }, _reducers)
});
var prefix = workflowManagerSlice.name;
var addProcess = workflowManagerSlice.actions[Types.addProcess];
var removeProcess = workflowManagerSlice.actions[Types.removeProcess];
var workflowManager_slice = workflowManagerSlice.reducer;

var createWorkflowAction = function createWorkflowAction(workflowAction, payload) {
  var actionName = prefix + "/external/" + workflowAction;
  return toolkit.createAction(actionName)(payload);
};

var VALID_TOPIC_PATTERN = /^(([\\+#]{1}|[^\\+#]*)\/)?(([\\+#]{1}|[^\\+#]*)\/{1})*(([\\+#]{1}|[^\\+#]*))$/;
var ERROR_MESSAGES = {
  NO_WRAPPER: 'No context found. Did you forget to wrap your app with WorkflowManager component?',
  NO_VALID_TOPICS: 'Invalid MQTT topic(s) pattern(s). Please check your topics in the subscribe method.',
  ERROR_OCURRED: 'An error occurred in MQTT client.',
  NOT_CONNECTED: 'MQTT client is not connected.',
  FAILED_TO_CONNECT: 'Failed to connect to MQTT broker. Please, check your connection settings.',
  NO_STORE: 'No store found. Did you forget to set the store?',
  INVALID_JSON: 'The MQTT message is not a valid JSON.'
};
var PROCESS_TOPIC_PATTERN = '/process/+processId/am/create';

var isValidTopic = function isValidTopic(topic) {
  return VALID_TOPIC_PATTERN.test(topic);
};

var isValidJSON = function isValidJSON(json) {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};

var hasStore = function hasStore(store) {
  var isValid = store !== null;
  if (!isValid)   invariant(false, ERROR_MESSAGES.NO_STORE)  ;
  return isValid;
};
var isClientConnected = function isClientConnected(client) {
  var isValid = client == null ? void 0 : client.connected;
  if (!isValid)   invariant(false, ERROR_MESSAGES.NOT_CONNECTED)  ;
  return client == null ? void 0 : client.connected;
};
var hasAllValidTopics = function hasAllValidTopics(topics) {
  var isValid = Array.isArray(topics) ? topics.every(function (topic) {
    return isValidTopic(topic);
  }) : isValidTopic(topics);
  if (!isValid)   invariant(false, ERROR_MESSAGES.NO_VALID_TOPICS)  ;
  return isValid;
};
var shouldSubscribeOrUnsubscribe = function shouldSubscribeOrUnsubscribe(topics, store, client) {
  return hasAllValidTopics(topics) && hasStore(store) && isClientConnected(client);
};

var WorkflowManagerConfig = /*#__PURE__*/function () {
  function WorkflowManagerConfig() {
    this._setInstance(this);
    this.subscribe = this.subscribe.bind(this);
  }
  var _proto = WorkflowManagerConfig.prototype;
  _proto._setInstance = function _setInstance(instance) {
    if (!WorkflowManagerConfig._instance) {
      WorkflowManagerConfig._instance = instance;
    }
  };
  _proto._onMessageArrived = function _onMessageArrived(subscribeTopic) {
    return function (topic, message) {
      var payloadString = message.toString();
      if (!isValidJSON(payloadString)) {
          invariant(false, ERROR_MESSAGES.INVALID_JSON)  ;
        return;
      }
      var topics = [subscribeTopic].flat();
      var isMatched = topics.some(function (subTopic) {
        return mqttPattern.matches(subTopic, topic);
      });
      if (isMatched) {
        var _payload$props, _payload$props2;
        var store = WorkflowManagerConfig._store;
        var dispatch = store == null ? void 0 : store.dispatch;
        var payload = JSON.parse(message.toString());
        var action = (payload == null ? void 0 : (_payload$props = payload.props) == null ? void 0 : _payload$props.action) || '';
        var result = (payload == null ? void 0 : (_payload$props2 = payload.props) == null ? void 0 : _payload$props2.result) || {};
        dispatch(createWorkflowAction(action, result));
      }
    };
  };
  WorkflowManagerConfig.getInstance = function getInstance() {
    return Object.freeze(WorkflowManagerConfig._instance);
  };
  WorkflowManagerConfig.setMqttClient = function setMqttClient(client) {
    this._client = client;
  };
  WorkflowManagerConfig.getStore = function getStore() {
    return this._store;
  }
  /**
   * @description Set the redux store. This is used to dispatch actions in the workflow manager.
   * @param {Store} store
   * @returns {void}
   */;
  _proto.setStore = function setStore(store) {
    WorkflowManagerConfig._store = store;
  }
  /**
   * @description The MQTT Client instance is intended for external react component. Be sure to use this after de WorkflowManager component has been mounted.
   * @returns {MqttClient | null}
   */;
  _proto.getMqttClient = function getMqttClient() {
    return WorkflowManagerConfig._client;
  }
  /**
   * @description Subscribe to a topic or topics.
   * @param {(string | string[])} topic
   * @param {IClientSubscribeOptions} options
   */;
  _proto.subscribe = function subscribe(topic, options) {
    if (options === void 0) {
      options = {};
    }
    var client = this.getMqttClient();
    var store = WorkflowManagerConfig._store;
    var shouldSubscribe = shouldSubscribeOrUnsubscribe(topic, store, client);
    if (!shouldSubscribe) return;
    var dispatch = store == null ? void 0 : store.dispatch;
    var topics = [topic].flat();
    topics.forEach(function (subTopic) {
      var topicParams = mqttPattern.exec(PROCESS_TOPIC_PATTERN, subTopic);
      var processId = (topicParams == null ? void 0 : topicParams.processId) || '';
      if (processId) dispatch(addProcess(processId));
    });
    client == null ? void 0 : client.subscribe(topic, options);
    client == null ? void 0 : client.on('message', this._onMessageArrived(topic));
  };
  _proto.unsubscribe = function unsubscribe(topic) {
    var client = this.getMqttClient();
    var store = WorkflowManagerConfig._store;
    var unsubscribe = shouldSubscribeOrUnsubscribe(topic, store, client);
    if (!unsubscribe) return;
    var dispatch = store == null ? void 0 : store.dispatch;
    var topics = [topic].flat();
    client == null ? void 0 : client.unsubscribe(topic);
    topics.forEach(function (subTopic) {
      dispatch(removeProcess(subTopic));
    });
  };
  return WorkflowManagerConfig;
}();
WorkflowManagerConfig._client = null;
WorkflowManagerConfig._store = null;
WorkflowManagerConfig._instance = /*#__PURE__*/new WorkflowManagerConfig();

var MqttContext = /*#__PURE__*/React.createContext(undefined);
var MqttProvider = MqttContext.Provider;

var WorkflowManager = function WorkflowManager(_ref) {
  var _ref$brokerUrl = _ref.brokerUrl,
    brokerUrl = _ref$brokerUrl === void 0 ? '' : _ref$brokerUrl,
    options = _ref.options,
    children = _ref.children;
  var _useState = React.useState(null),
    client = _useState[0],
    setClient = _useState[1];
  var _useState2 = React.useState('offline'),
    status = _useState2[0],
    setStatus = _useState2[1];
  var _useState3 = React.useState(null),
    error = _useState3[0],
    setError = _useState3[1];
  var init = React.useCallback(function () {
    if (!client) {
      try {
        var mqttInstance = precompiledMqtt.connect(brokerUrl, options);
        mqttInstance.on('connect', function () {
          setStatus('connected');
        });
        mqttInstance.on('end', function () {
          setStatus('offline');
        });
        mqttInstance.on('offline', function () {
          setStatus('offline');
        });
        mqttInstance.on('error', function () {
          setStatus('error');
          !false ? "development" !== "production" ? invariant(false, ERROR_MESSAGES.ERROR_OCURRED) : invariant(false) : void 0;
        });
        mqttInstance.on('reconnect', function () {
          setStatus('reconnecting');
        });
        setClient(mqttInstance);
        WorkflowManagerConfig.setMqttClient(mqttInstance);
      } catch (error) {
        setStatus('error');
        setError(error);
          invariant(false, ERROR_MESSAGES.FAILED_TO_CONNECT)  ;
      }
    }
  }, [brokerUrl, options, client]);
  React.useEffect(function () {
    init();
  }, [init]);
  var providerValue = React.useMemo(function () {
    return {
      client: client,
      status: status,
      error: error
    };
  }, [client, status, error]);
  return React__default.createElement(MqttProvider, {
    value: providerValue
  }, children);
};

var useMqtt = function useMqtt() {
  var context = React.useContext(MqttContext);
  !context ?  invariant(false, ERROR_MESSAGES.NO_WRAPPER)  : void 0;
  return context;
};

/**
 * @description Subscribe to a topic or topics.
 */
var useSubscribe = function useSubscribe() {
  return React.useMemo(function () {
    return WorkflowManagerConfig$1.subscribe;
  }, []);
};

/**
 * @description Subscribe to a topic or topics.
 */
var useUnsubscribe = function useUnsubscribe() {
  return React.useMemo(function () {
    return WorkflowManagerConfig$1.unsubscribe;
  }, []);
};

var WorkflowManagerConfig$1 = /*#__PURE__*/WorkflowManagerConfig.getInstance();

exports.WorkflowManager = WorkflowManager;
exports.WorkflowManagerConfig = WorkflowManagerConfig$1;
exports.useMqtt = useMqtt;
exports.useSubscribe = useSubscribe;
exports.useUnsubscribe = useUnsubscribe;
exports.workflowManagerReducer = workflowManager_slice;
//# sourceMappingURL=react-mqtt-workflow-manager.cjs.development.js.map
