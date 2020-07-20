/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const inlinedHostConfigs = require('../shared/inlinedHostConfigs');

const configTemplate = fs
  .readFileSync(__dirname + '/config/.flowconfig')
  .toString();

function writeConfig(renderer, rendererInfo, isServerSupported) {
  const folder = __dirname + '/' + renderer;
  mkdirp.sync(folder);

  const serverRenderer = isServerSupported ? renderer : 'custom';

  const ignoredPaths = [];

  inlinedHostConfigs.forEach(otherRenderer => {
    if (otherRenderer === rendererInfo) {
      return;
    }
    otherRenderer.paths.forEach(otherPath => {
      if (rendererInfo.paths.indexOf(otherPath) !== -1) {
        return;
      }
      ignoredPaths.push(`.*/packages/${otherPath}`);
    });
  });

  const config = configTemplate
    .replace(
      '%NIRVANA_RENDERER_FLOW_OPTIONS%',
      `
      module.system.node.resolve_dirname=node_modules
      module.system.node.resolve_dirname=packages
    `.trim()
    )
    .replace('%REACT_RENDERER_FLOW_IGNORES%', ignoredPaths.join('\n'));

  const disclaimer = `
# ---------------------------------------------------------------#
# NOTE: this file is generated.                                  #
# If you want to edit it, open ./scripts/flow/config/flowconfig. #
# Then run Yarn for changes to take effect.                      #
# ---------------------------------------------------------------#
  `.trim();

  const configFile = folder + '/.flowconfig';
  let oldConfig;
  try {
    oldConfig = fs.readFileSync(configFile).toString();
  } catch (err) {
    oldConfig = null;
  }
  const newConfig = `
${disclaimer}
${config}
${disclaimer}
`.trim();

  if (newConfig !== oldConfig) {
    fs.writeFileSync(configFile, newConfig);
    console.log(chalk.dim('Wrote a Flow config to ' + configFile));
  }
}

// Write multiple configs in different folders
// so that we can run those checks in parallel if we want.
inlinedHostConfigs.forEach(rendererInfo => {
  if (rendererInfo.isFlowTyped) {
    writeConfig(
      rendererInfo.shortName,
      rendererInfo,
      rendererInfo.isServerSupported
    );
  }
});
