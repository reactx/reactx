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
  UI: 'UI',
};

// React Components
const COMPONENT = moduleTypes.COMPONENT;
const UI = moduleTypes.UI;

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
    entry: 'reactx-components',
    global: 'ReactComponents',
    externals: ['react', 'react-dom'],
  },
  /******* React SVG Components (experimental) *******/
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
    entry: 'reactx-svg-components',
    global: 'ReactSVG',
    externals: ['react', 'react-dom', 'react-dom/server', 'prop-types'],
  },
  /******* Drag And Drop (experimental) *******/
  {
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
    moduleType: UI,
    entry: 'reactx-dragdrop',
    global: 'ReactDnD',
    externals: ['react', 'react-dom', 'crypto'],
  },
  /******* Viewer (experimental) *******/
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
    entry: 'reactx-viewer-components',
    global: 'ReactViewer',
    externals: ['react', 'react-dom'],
  },
  /******* BPMN based on bpmn.io *******/
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
    entry: 'reactx-bpmn',
    global: 'ReactBPMN',
    externals: ['react', 'react-dom', 'bpmn-js/lib/Modeler'],
  },
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
