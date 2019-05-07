/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

const ReactSVG = require('./src/ReactSVG');

// This is hacky but makes it work with both Rollup and Jest.
module.exports = ReactSVG.default || ReactSVG;
