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

import DragSource from './DragSource/DragSource';
import DropTarget from './DropTarget/DropTarget';
import DragDropProvider from './ContextManager';

const ReactDnD = {
  DragSource,
  DropTarget,
  DragDropProvider,
  // DragDropContext,
  // DragDropConsumer,
};

export default ReactDnD;
