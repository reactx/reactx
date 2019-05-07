'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-viewer-components.production.min.js');
} else {
  module.exports = require('./cjs/react-viewer-components.development.js');
}
