'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./reactx-components.production.min.js');
} else {
  module.exports = require('./reactx-components.development.js');
}
