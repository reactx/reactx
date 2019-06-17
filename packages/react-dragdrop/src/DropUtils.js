/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type DragOptions = {|
  dragOver(e: EventTarget): void,
  dragEnter(e: EventTarget): void,
  dragLeave(e: EventTarget): void,
  drop(e: EventTarget): void,
  targetId: string,
|};

export function connectDropTarget(node: HTMLDivElement, options: DragOptions) {
  const handleDragEnter = (e: DragEvent) => HandleDragEnter(e, options);
  const handleDragOver = (e: DragEvent) => HandleDragOver(e, options);
  const handleDragLeave = (e: DragEvent) => HandleDragLeave(e, options);
  const handleDrop = (e: DragEvent) => HandleDrop(e, options);

  node.addEventListener('dragenter', handleDragEnter);
  node.addEventListener('dragover', handleDragOver);
  node.addEventListener('dragleave', handleDragLeave);
  node.addEventListener('drop', handleDrop);

  //Clean garbage collector
  return () => {
    node.removeEventListener('dragenter', handleDragEnter);
    node.removeEventListener('dragover', handleDragOver);
    node.removeEventListener('drop', handleDrop);
  };
}

function getCurrentDropEffect(): string {
  return 'move';
  
  // context.getCurrentNode()
  //   ? context.getCurrentNode().dropEffect
  //   : 'move';
}

function HandleDragOver(e: DragEvent, options: DragOptions) {
  // Show user-specified drop effect.
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (e.dataTransfer) {
    const {dataTransfer} = e;
    dataTransfer.dropEffect = getCurrentDropEffect();
  }

  if (options.dragOver) {
    options.dragOver(e.target, options.targetId);
  }
}
function HandleDragLeave(e: DragEvent, options: DragOptions) {
  // Show user-specified drop effect.
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (e.dataTransfer) {
    const {dataTransfer} = e;
    dataTransfer.dropEffect = getCurrentDropEffect();
  }

  if (options.dragLeave) {
    options.dragLeave(e.target, options.targetId);
  }
}

function HandleDragEnter(e: DragEvent, options: DragOptions) {
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (e.dataTransfer) {
    const {dataTransfer} = e;
    dataTransfer.dropEffect = getCurrentDropEffect();
  }

  if (options.dragEnter) {
    options.dragEnter(e.target, options.targetId);
  }
}

function HandleDrop(e: DragEvent, options: DragOptions) {
  e.preventDefault();
  //TODO: check native and electron, flutter
  if (options.drop) {
    options.drop(e.target, options.targetId);
  }
}
