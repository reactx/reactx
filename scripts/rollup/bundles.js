'use strict';

const bundleTypes = {
  UMD_DEV: 'UMD_DEV',
  UMD_PROD: 'UMD_PROD',
};

const UMD_DEV = bundleTypes.UMD_DEV;
const UMD_PROD = bundleTypes.UMD_PROD;

const bundles = [
  /******* React Components (web-components) *******/
  {
    bundleTypes: [UMD_DEV, UMD_PROD],
    entry: '@reactx/reactx-form-components',
    global: 'ReactFormComponents',
    externals: [
      'react',
      'react-dom',
      'react-datepicker',
      '@popperjs/core',
      'date-fns',
      'react-transition-group',
      'dompurify',
      'draft-convert',
      'draft-js'
    ],
  },
  {
    bundleTypes: [UMD_DEV, UMD_PROD],
    entry: '@reactx/reactx-web-components',
    global: 'ReactWebComponents',
    externals: ['react', 'react-dom'],
  },
  // {
  //   bundleTypes: [UMD_DEV, UMD_PROD],
  //   entry: '@reactx/reactx-disclosure-components',
  //   global: 'ReactDisclosureComponents',
  //   externals: ['react', 'react-dom'],
  // },
  {
    bundleTypes: [UMD_DEV, UMD_PROD],
    entry: '@reactx/reactx-overlay-components',
    global: 'ReactOverlayComponents',
    externals: ['react', 'react-dom'],
  },
  {
    bundleTypes: [UMD_DEV, UMD_PROD],
    entry: '@reactx/reactx-slider-components',
    global: 'ReactSliderComponents',
    externals: ['react', 'react-dom','swiper'],
  },
  {
    bundleTypes: [UMD_DEV, UMD_PROD],
    entry: '@reactx/reactx-data-components',
    global: 'ReactDataComponents',
    externals: ['react', 'react-dom'],
  },
  // {
  //   bundleTypes: [UMD_DEV, UMD_PROD],
  //   entry: '@reactx/reactx-feedback-components',
  //   global: 'ReactFeedbackComponents',
  //   externals: ['react', 'react-dom'],
  // },
  // {
  //   bundleTypes: [UMD_DEV, UMD_PROD],
  //   entry: '@reactx/reactx-components',
  //   global: 'ReactComponents',
  //   externals: [
  //     'react',
  //     'react-dom',
  //     'react-datepicker',
  //     '@popperjs/core',
  //     'date-fns',
  //     'react-transition-group',
  //   ],
  // },
];
// Based on deep-freeze by substack (public domain)
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
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
  bundles,
};
