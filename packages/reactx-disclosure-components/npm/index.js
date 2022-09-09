'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./reactx-disclosure-components.min.js');
} else {
  module.exports = require('./reactx-disclosure-components.js');
}
