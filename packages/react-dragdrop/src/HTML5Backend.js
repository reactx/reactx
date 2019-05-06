/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
const sourceNodes: Map<string, Element> = new Map();
const sourceNodeOptions: Map<string, any> = new Map();
const dragStartSourceIds: string[] = [];
const dropTargetIds: string[] = [];
const dragEnterTargetIds: string[] = [];
const dragOverTargetIds: string[] = [];

export function connectDragSource(
  node: Element,
  sourceId: string,
  options: any,
) {
  sourceNodes.set(sourceId, node);
  sourceNodeOptions.set(sourceId, options);

  const handleDragStart = (e: any) => HandleDragStart(e, sourceId);
  const handleSelectStart = (e: any) => HandleSelectStart(e);

  node.setAttribute('draggable', 'true');
  node.addEventListener('dragstart', handleDragStart);
  node.addEventListener('selectstart', handleSelectStart);

  return () => {
    sourceNodes.delete(sourceId);
    sourceNodeOptions.delete(sourceId);

    node.removeEventListener('dragstart', handleDragStart);
    node.removeEventListener('selectstart', handleSelectStart);
    node.setAttribute('draggable', 'false');
  };
}

export function connectDropTarget(targetId: string, node: HTMLElement) {
  const handleDragEnter = (e: DragEvent) => HandleDragEnter(e, targetId);
  const handleDragOver = (e: DragEvent) => HandleDragOver(e, targetId);
  const handleDrop = (e: DragEvent) => HandleDrop(e, targetId);

  node.addEventListener('dragenter', handleDragEnter);
  node.addEventListener('dragover', handleDragOver);
  node.addEventListener('drop', handleDrop);

  return () => {
    node.removeEventListener('dragenter', handleDragEnter);
    node.removeEventListener('dragover', handleDragOver);
    node.removeEventListener('drop', handleDrop);
  };
}

function HandleDragEnter(e: DragEvent, targetId: string) {
  dragEnterTargetIds.unshift(targetId);
}

function HandleDragOver(e: DragEvent, targetId: string) {
  dragOverTargetIds.unshift(targetId);
}

function HandleDrop(e: DragEvent, targetId: string) {
  dropTargetIds.unshift(targetId);
}

function HandleDragStart(e: DragEvent, sourceId: string) {
  dragStartSourceIds.unshift(sourceId);
}

const HandleSelectStart = (e: DragEvent) => {
  const target: HTMLElement & {dragDrop: () => {}} = e.target;

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
};
