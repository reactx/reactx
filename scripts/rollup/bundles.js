'use strict';

const bundleTypes = {
  UMD_DEV: 'UMD_DEV',
  UMD_PROD: 'UMD_PROD',
  NODE_DEV: 'NODE_DEV',
  NODE_PROD: 'NODE_PROD',
  RN_OSS_DEV: 'RN_OSS_DEV',
  RN_OSS_PROD: 'RN_OSS_PROD',
};

const UMD_DEV = bundleTypes.UMD_DEV;
const UMD_PROD = bundleTypes.UMD_PROD;
const NODE_DEV = bundleTypes.NODE_DEV;
const NODE_PROD = bundleTypes.NODE_PROD;
const RN_OSS_DEV = bundleTypes.RN_OSS_DEV;
const RN_OSS_PROD = bundleTypes.RN_OSS_PROD;

const moduleTypes = {
  COMPONENT: 'COMPONENT',
};

// React Components
const COMPONENT = moduleTypes.COMPONENT;

const bundles = [
  /******* React Components (experimental) *******/
  {
    bundleTypes: [
      UMD_DEV,
      UMD_PROD,
      NODE_DEV,
      NODE_PROD,
      RN_OSS_DEV,
      RN_OSS_PROD,
    ],
    moduleType: COMPONENT,
    entry: 'react-components',
    global: 'Reactx',
    externals: ['react','react-dom'],
  },

  // {
  //   bundleTypes: [
  //     UMD_DEV,
  //     UMD_PROD,
  //     NODE_DEV,
  //     NODE_PROD,
  //     RN_OSS_DEV,
  //     RN_OSS_PROD,
  //   ],
  //   moduleType: COMPONENT,
  //   entry: 'reactx-components/alert',
  //   global: 'ReactxComponents',
  //   externals: [],
  // },
];

// Based on deep-freeze by substack (public domain)
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}

// Don't accidentally mutate config as part of the build
deepFreeze(bundles);

module.exports = {
  bundleTypes,
  moduleTypes,
  bundles,
};
