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
  dragStart(e: Node): void,
|};

export function connectDragSource(node: Node, options: DragOptions) {
  const handleDragStart = (e: any) => HandleDragStart(e, options);
  const handleSelectStart = (e: any) => HandleSelectStart(e);

  node.setAttribute('draggable', 'true');
  node.addEventListener('dragstart', handleDragStart);
  node.addEventListener('selectstart', handleSelectStart);

  //Clean garbage collector
  return () => {
    node.removeEventListener('dragstart', handleDragStart);
    node.removeEventListener('selectstart', handleSelectStart);
    node.setAttribute('draggable', 'false');
  };
}

function HandleDragStart(e: DragEvent, options: DragOptions) {
  const clientOffset = getEventClientOffset(e);
  const { dataTransfer } = e;

  if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
    dataTransfer.setDragImage(
      e.target,
      clientOffset.x,
      clientOffset.y,
    );
  }
  try {
    // Firefox won't drag without setting data
    if (dataTransfer) {
      dataTransfer.setData('application/json', e.target);
    }
  } catch (err) {
    // IE doesn't support MIME types in setData
  }
  //TODO: check native and electron, flutter
  dataTransfer.effectAllowed = options.dropEffect;

  if (options.dragStart) {
    options.dragStart(e.target);
  }
}
