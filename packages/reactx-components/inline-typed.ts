/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 
 */

// This file must have the Flow annotation.
//
// This is the Flow-typed entry point for the reconciler. It should not be
// imported directly in code. Instead, our Flow configuration uses this entry
// point for the currently checked renderer (the one you passed to `yarn flow`).

export type BaseColor =
  | 'none'
  | 'normal'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';

export type LoadingSizeType = 'tiny' | 'small' | 'medium' | 'large' | 'extra';
