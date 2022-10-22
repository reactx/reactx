'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./reactx-form-components.min.js');
} else {
  module.exports = require('./reactx-form-components.js');
}
