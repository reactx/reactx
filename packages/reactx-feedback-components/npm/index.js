'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./reactx-feedback-components.min.js');
} else {
  module.exports = require('./reactx-feedback-components.js');
}
