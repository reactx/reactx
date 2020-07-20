/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* eslint-disable */

declare var trustedTypes: {|
  isHTML: (value: any) => boolean,
  isScript: (value: any) => boolean,
  isScriptURL: (value: any) => boolean,
  // TrustedURLs are deprecated and will be removed soon: https://github.com/WICG/trusted-types/pull/204
  isURL?: (value: any) => boolean,
|};

// EventListener www fork
declare module 'EventListener' {
  declare module.exports: {
    listen: (
      target: EventTarget,
      type: string,
      callback: Function,
      priority?: number,
      options?: {passive: boolean, ...}
    ) => mixed,
    capture: (target: EventTarget, type: string, callback: Function) => mixed,
    captureWithPassiveFlag: (
      target: EventTarget,
      type: string,
      callback: Function,
      passive: boolean
    ) => mixed,
    bubbleWithPassiveFlag: (
      target: EventTarget,
      type: string,
      callback: Function,
      passive: boolean
    ) => mixed,
    ...
  };
}

declare function __webpack_chunk_load__(id: string): Promise<mixed>;
declare function __webpack_require__(id: string): {default: any};
