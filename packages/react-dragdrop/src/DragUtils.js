/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type { Node } from 'react';
import { getEventClientOffset } from './OffsetUtils';

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

function HandleSelectStart(e: DragEvent, options: DragOptions) { }

function HandleDragStart(e: DragEvent, options: DragOptions) {
  // We'll handle this event so first stop bubbling up
  e.stopPropagation();
  const clientOffset = getEventClientOffset(e);
  const { dataTransfer } = e;

  try {
    // Firefox won't drag without setting data
    if (dataTransfer) {
      dataTransfer.dataTransfer.setData('application/json', {});
    }
  } catch (err) {
    // IE doesn't support MIME types in setData
  }
  //TODO: check native and electron, flutter
  // Now setup our dataTransfer object properly
  // First we'll allow a move action — this is used for the cursor
  e.dataTransfer.effectAllowed = options.dropEffect || 'move';

  if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
    dataTransfer.setDragImage(e.target, clientOffset.x, clientOffset.y);
  }

  if (options.dragStart) {
    options.dragStart(e.target);
  }
}
