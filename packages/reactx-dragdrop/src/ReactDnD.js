/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {useDrag} from './DragSource/DragSource';
import {useDrop} from './DropTarget/DropTarget';
import DragDropProvider from './ContextManager';

const useDragDrop = () => {
  return {
    useDrag,
    useDrop,
  };
};

const ReactDnD = {
  useDragDrop,
  DragDropProvider,
};

export default ReactDnD;
