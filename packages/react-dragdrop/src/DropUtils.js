/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type {Node} from 'react';
import {getEventClientOffset, getDragPreviewOffset} from './OffsetUtils';

type DragOptions = {|
  dropEffect: string,
  dragOver(e: Node): void,
  dragEnter(e: Node): void,
  drop(e: Node): void,
|};

export function connectDropTarget(node: Node, options: DragOptions) {
  const handleDragEnter = (e: DragEvent) => HandleDragEnter(e, options);
  const handleDragOver = (e: DragEvent) => HandleDragOver(e, options);
  const handleDrop = (e: DragEvent) => HandleDrop(e, options);

  node.addEventListener('dragenter', handleDragEnter);
  node.addEventListener('dragover', handleDragOver);
  node.addEventListener('drop', handleDrop);

  return () => {
    node.removeEventListener('dragenter', handleDragEnter);
    node.removeEventListener('dragover', handleDragOver);
    node.removeEventListener('drop', handleDrop);
  };
}

function HandleDragOver(e: DragEvent, options: DragOptions) {
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'none';
  }

  if (options.dragOver) {
    options.dragOver(e.target);
  }
}

function HandleDragEnter(e: DragEvent, options: DragOptions) {
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy';
  }

  if (options.dragEnter) {
    options.dragEnter(e.target);
  }
}

function HandleDrop(e: DragEvent, options: DragOptions) {
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (options.drop) {
    options.drop(e.target);
  }
}
