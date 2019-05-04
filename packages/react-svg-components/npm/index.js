'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-svg-components.production.min.js');
} else {
  module.exports = require('./cjs/react-svg-components.development.js');
}
