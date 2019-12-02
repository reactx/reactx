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

import {type Element as ReactElement, type RefObject} from 'react';

export type XYCoord = {|
  x: number,
  y: number,
|};

export type State = {
  item: any,
  source: EventTarget | null,
  clonable: boolean,
  component: ReactElement<any> | null,
};

export type Action = {
  item: any,
  type: String,
};
export type ConnectableElement = Element | null;
export type DragSourceProps = {
  index?: number,
  cssSource?: any,
  children: ReactElement<any>,
  handler?: Element,
  forwardedref: any,
  clonable?: boolean,
  ref?: any,
  component?: ReactElement<any>,
  onDragStart(e: EventTarget): void,
};

export type DropTargetProps = {|
  index: number,
  componentType: string,
  children: ReactElement<any>,
  style: any,
  forwardedref?: any,
  ref?: any,
  canDropByClassNames: string[],
  onDragLeave: (event: EventTarget) => void,
  onDragOver: (event: EventTarget) => void,
  onDragEnter: (event: EventTarget) => void,
  onDrop: (
    target: EventTarget,
    source: EventTarget | null,
    payload: any,
  ) => void,
|};

export * from './src/ReactDnD';
