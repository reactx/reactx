/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import DragSource, {useDrag} from './DragSource/DragSource';
import DropTarget, {useDrop} from './DropTarget/DropTarget';
import DragDropProvider from './ContextManager';

const ReactDnD = {
  DragSource,
  useDrag,
  DropTarget,
  useDrop,
  DragDropProvider,
};

export default ReactDnD;
