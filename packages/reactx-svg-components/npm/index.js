'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reactx-svg-components.production.min.js');
} else {
  module.exports = require('./cjs/reactx-svg-components.development.js');
}
