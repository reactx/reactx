/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type XYCoord = {|
  x: number,
  y: number,
|};

export type State = {
  item: any,
  sourceId: string | null,
  targetId: string,
  targetIds: string[],
  didDrop: boolean
};

export type Action = {
  item: any,
  sourceId: string,
  targetId: string,
  type: String,
};

export const Actions = {
  BEGIN_DRAG:'BEGIN_DRAG',
  DRAG_ENTER:'DRAG_ENTER',
  REMOVE_TARGET:'REMOVE_TARGET',
  DROP:'DROP',
}


import DragSource from './DragSource/DragSource';
import DropTarget from './DropTarget/DropTarget';
import DragDropProvider from './ContextManager';

const ReactDnD = {
  DragSource,
  DropTarget,
  DragDropProvider
};

export default ReactDnD;
