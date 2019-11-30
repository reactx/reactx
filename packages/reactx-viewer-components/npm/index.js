'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reactx-viewer-components.production.min.js');
} else {
  module.exports = require('./cjs/reactx-viewer-components.development.js');
}
