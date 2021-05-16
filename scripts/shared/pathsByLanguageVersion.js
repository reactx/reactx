/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 'use strict';

 // Files that are transformed and can use ES6/TSX/JSX.
 const esNextPaths = [
   // Internal forwarding modules
   'packages/*/*{.js,.ts,.tsx}',
   // Source files
   'packages/*/src/**/*{.js,.ts,.tsx}',   
 ];
 
 // Files that we distribute on npm that should be ES5-only.
 const es5Paths = ['packages/*/npm/**/*.js'];
 
 module.exports = {
   esNextPaths,
   es5Paths,
 };