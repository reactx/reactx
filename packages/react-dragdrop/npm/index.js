'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-dragdrop.production.min.js');
} else {
  module.exports = require('./cjs/react-dragdrop.development.js');
}
