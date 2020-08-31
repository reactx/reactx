/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// This file must have the Flow annotation.
//
// This is the Flow-typed entry point for the reconciler. It should not be
// imported directly in code. Instead, our Flow configuration uses this entry
// point for the currently checked renderer (the one you passed to `yarn flow`).

export type ButtonProps = {
  id?: string,
  title?: string,
  type?: string,
  btncolor?: string,
  disabled: boolean,
  badgeProps: {
    badge: string,
    className: string,
    badgecolor: string,
  },

  buttonProps: any,
  className?: string,
  forwardedRef: {current: any},
  renderButton?: (props: any) => void,
  renderBadge?: (props: any) => void,
  onClick: (e: MouseEventHandler<T>) => void,
};
export * from './src/ReactComponents';
