
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-mqtt-workflow-manager.cjs.production.min.js')
} else {
  module.exports = require('./react-mqtt-workflow-manager.cjs.development.js')
}
