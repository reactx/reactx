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
import Setup, { Teardown } from './HTML5Backend';
import DragDropProvider from './ContextManager';

const ReactDnD = {
  DragSource,
  DropTarget,
  Setup,
  Teardown,
  DragDropProvider,
  // DragDropContext,
  // DragDropConsumer,
};

export default ReactDnD;
