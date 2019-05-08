'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-bpmn.production.min.js');
} else {
  module.exports = require('./cjs/react-bpmn.development.js');
}
