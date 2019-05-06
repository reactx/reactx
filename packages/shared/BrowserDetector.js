/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {memoize} from './discount_lodash';

export type Predicate = () => boolean;
export const isFirefox: Predicate = memoize(() =>
  /firefox/i.test(navigator.userAgent),
);
export const isSafari: Predicate = memoize(() => window.safari === true);
