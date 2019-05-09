/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type { Node } from 'react';
import { getEventClientOffset, getDragPreviewOffset } from './OffsetUtils';

type DragOptions = {|
  dropEffect: string,
|};

export function connectDropTarget(node: Node, options: DragOptions) {
  const handleDragEnter = (e: DragEvent) => HandleDragEnter(e);
  const handleDragOver = (e: DragEvent) => HandleDragOver(e);
  const handleDrop = (e: DragEvent) => HandleDrop(e);

  node.addEventListener('dragenter', handleDragEnter);
  node.addEventListener('dragover', handleDragOver);
  node.addEventListener('drop', handleDrop);

  return () => {
    node.removeEventListener('dragenter', handleDragEnter);
    node.removeEventListener('dragover', handleDragOver);
    node.removeEventListener('drop', handleDrop);
  };
}

function HandleDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}

function HandleDragEnter(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}


function HandleDrop(e: DragEvent, options: DragOptions) {
  debugger
  e.preventDefault();
  var data = e.dataTransfer.getData("Text");
}
