/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import {getEventClientOffset, getDragPreviewOffset} from './OffsetUtils';

type DragOptions = {|
  dragImage?: Element,
  dragStart(e: EventTarget): void,
|};

export function connectDragSource(node: Element, options: DragOptions) {
  const handleDragStart = (e: any) => HandleDragStart(e, options);
  const handleSelectStart = (e: any) => HandleSelectStart(e, options);

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

function HandleSelectStart(e: DragEvent, options: DragOptions) {
  const target: any = e.target;

  // Only IE requires us to explicitly say
  // we want drag drop operation to start
  if (typeof target.dragDrop !== 'function') {
    return;
  }

  // Inputs and textareas should be selectable
  if (
    target.tagName === 'INPUT' ||
    target.tagName === 'SELECT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  ) {
    return;
  }

  // For other targets, ask IE
  // to enable drag and drop
  e.preventDefault();
  target.dragDrop();
}

function HandleDragStart(e: DragEvent, options: DragOptions) {
  // We'll handle this event so first stop bubbling up
  e.stopPropagation();

  const clientOffset = getEventClientOffset(e);
  const {dataTransfer} = e;

  try {
    // Firefox won't drag without setting data
    if (dataTransfer) {
      dataTransfer.setData('plain/text', 'dummmy_data');
    }
  } catch (err) {
    // IE doesn't support MIME types in setData
  }

  if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
    const anchorPoint = {anchorX: 0.5, anchorY: 0.5};
    //TODO: get offsetX and offsetY from options
    const offsetPoint = {offsetX: e.offsetX, offsetY: e.offsetY};

    const dragPreviewOffset = getDragPreviewOffset(
      e.target,
      e.target,
      clientOffset,
      anchorPoint,
      offsetPoint,
    );
    dataTransfer.setDragImage(
      options.dragImage || (e.target: any),
      dragPreviewOffset.x,
      dragPreviewOffset.y,
    );
  }

  if (options.dragStart) {
    options.dragStart(e.target);
  }
}
