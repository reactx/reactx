/**
 * Copyright (c) React and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const reactVersion = require('../../package.json').version;
const versions = {
  'packages/reactx-components/package.json': require('../../packages/reactx-components/package.json')
    .version,
  'packages/reactx-svg-components/package.json': require('../../packages/reactx-svg-components/package.json')
    .version,
};

let allVersionsMatch = true;
Object.keys(versions).forEach(function(name) {
  const version = versions[name];
  if (version !== reactVersion) {
    allVersionsMatch = false;
    console.log(
      '%s version does not match package.json. Expected %s, saw %s.',
      name,
      reactVersion,
      version
    );
  }
});

if (!allVersionsMatch) {
  process.exit(1);
}
