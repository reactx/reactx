/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
import type {Node} from 'react';
import {getEventClientOffset, getDragPreviewOffset} from './OffsetUtils';

const sourcePreviewNodes: Map<string, Element> = new Map();
const sourcePreviewNodeOptions: Map<string, any> = new Map();
const sourceNodes: Map<string, Element> = new Map();
const sourceNodeOptions: Map<string, any> = new Map();
let dragStartSourceIds: string[] = [];
const dropTargetIds: string[] = [];
const dragEnterTargetIds: string[] = [];
const dragOverTargetIds: string[] = [];

let currentDragSourceNode: Element | null = null;
let mouseMoveTimeoutTimer: number | null = null;

export default function Setup() {
  if (window === undefined) {
    return;
  }

  if (window.__isReactDndBackendSetUp) {
    throw new Error('Cannot have two HTML5 backends at the same time.');
  }

  window.__isReactDndBackendSetUp = true;

  addEventListeners(window);
}

export function Teardown() {
  if (window === undefined) {
    return;
  }

  window.__isReactDndBackendSetUp = false;
  removeEventListeners(window);
  clearCurrentDragSourceNode();
  //TODO: animation
  // if (this.asyncEndDragFrameId) {
  //   this.window.cancelAnimationFrame(this.asyncEndDragFrameId)
  // }
}

function addEventListeners(target: Node) {
  if (!target.addEventListener) {
    return;
  }
  target.addEventListener('dragstart', HandleTopDragStart);
  // target.addEventListener('dragstart', HandleTopDragStartCapture, true);
  // target.addEventListener('dragend', HandleTopDragEndCapture, true);
  // target.addEventListener('dragenter', HandleTopDragEnter);
  // target.addEventListener('dragenter', handleTopDragEnterCapture, true);
  // target.addEventListener('dragleave', HandleTopDragLeaveCapture, true);
  // target.addEventListener('dragover', HandleTopDragOver);
  // target.addEventListener('dragover', HandleTopDragOverCapture, true);
  target.addEventListener('drop', HandleTopDrop);
  // target.addEventListener('drop', HandleTopDropCapture, true);
}

function removeEventListeners(target: Node) {
  if (!target.removeEventListener) {
    return;
  }
  target.removeEventListener('dragstart', HandleTopDragStart);
  // target.removeEventListener('dragstart', HandleTopDragStartCapture, true);
  // target.removeEventListener('dragend', HandleTopDragEndCapture, true);
  // target.removeEventListener('dragenter', HandleTopDragEnter);
  // target.removeEventListener('dragenter', HandleTopDragEnterCapture, true);
  // target.removeEventListener('dragleave', HandleTopDragLeaveCapture, true);
  // target.removeEventListener('dragover', HandleTopDragOver);
  // target.removeEventListener('dragover', HandleTopDragOverCapture, true);
  target.removeEventListener('drop', HandleTopDrop);
  // target.removeEventListener('drop', HandleTopDropCapture, true);
}

function HandleTopDrop(e: DragEvent) {
  //TODO: actions
  // const localdropTargetIds = dropTargetIds;
  // dropTargetIds = [];

  // this.actions.hover(localdropTargetIds, {
  //   clientOffset: getEventClientOffset(e),
  // })
  // this.actions.drop({ dropEffect: this.getCurrentDropEffect() })
  endDragIfSourceWasRemovedFromDOM();
}

const endDragIfSourceWasRemovedFromDOM = () => {
  const node = currentDragSourceNode;
  if (isNodeInDocument(node)) {
    return;
  }

  if (clearCurrentDragSourceNode()) {
    //TODO: actions
    // this.actions.endDrag()
  }
};

function HandleTopDragStart(e: DragEvent) {
  // const localDragStartSourceIds = dragStartSourceIds;
  dragStartSourceIds = [];

  const clientOffset = getEventClientOffset(e);

  //TODO: impl monitor and action
  // // Avoid crashing if we missed a drop event or our previous drag died
  // if (this.monitor.isDragging()) {
  //   this.actions.endDrag()
  // }

  // Don't publish the source just yet (see why below)
  // this.actions.beginDrag(localDragStartSourceIds || [], {
  //   publishSource: false,
  //   getSourceClientOffset: this.getSourceClientOffset,
  //   clientOffset,
  // })

  const {dataTransfer} = e;

  //TODO: monitor
  // if (this.monitor.isDragging()) {
  if (true) {
    if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
      // Use custom drag image if user specifies it.
      // If child drag source refuses drag but parent agrees,
      // use parent's node as drag image. Neither works in IE though.
      //TODO: monitor
      const sourceId: string = 'ITEM'; // this.monitor.getSourceId();
      const sourceNode = sourceNodes.get(sourceId);
      const dragPreview = sourcePreviewNodes.get(sourceId) || sourceNode;

      if (dragPreview) {
        const {
          anchorX,
          anchorY,
          offsetX,
          offsetY,
        } = getCurrentSourcePreviewNodeOptions();
        const anchorPoint = {anchorX, anchorY};
        const offsetPoint = {offsetX, offsetY};
        const dragPreviewOffset = getDragPreviewOffset(
          sourceNode,
          dragPreview,
          clientOffset,
          anchorPoint,
          offsetPoint,
        );

        dataTransfer.setDragImage(
          dragPreview,
          dragPreviewOffset.x,
          dragPreviewOffset.y,
        );
      }
    }

    try {
      // Firefox won't drag without setting data
      if (dataTransfer) {
        dataTransfer.setData('application/json', {});
      }
    } catch (err) {
      // IE doesn't support MIME types in setData
    }

    // Store drag source node so we can check whether
    // it is removed from DOM and trigger endDrag manually.
    setCurrentDragSourceNode(e.target);

    // Now we are ready to publish the drag source.. or are we not?
    const {captureDraggingState} = getCurrentSourcePreviewNodeOptions();
    if (!captureDraggingState) {
      // Usually we want to publish it in the next tick so that browser
      // is able to screenshot the current (not yet dragging) state.
      //
      // It also neatly avoids a situation where render() returns null
      // in the same tick for the source element, and browser freaks out.
      //TODO: actions
      // setTimeout(() => this.actions.publishDragSource(), 0)
    } else {
      // In some cases the user may want to override this behavior, e.g.
      // to work around IE not supporting custom drag previews.
      //
      // When using a custom drag layer, the only way to prevent
      // the default drag preview from drawing in IE is to screenshot
      // the dragging state in which the node itself has zero opacity
      // and height. In this case, though, returning null from render()
      // will abruptly end the dragging, which is not obvious.
      //
      // This is the reason such behavior is strictly opt-in.
      //TODO: actions
      // this.actions.publishDragSource()
    }
  } else if (
    dataTransfer &&
    !dataTransfer.types &&
    ((e.target && !e.target.hasAttribute) ||
      !e.target.hasAttribute('draggable'))
  ) {
    // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
    // Just let it drag. It's a native type (URL or text) and will be picked up in
    // dragenter handler.
    return;
  } else {
    // If by this time no drag source reacted, tell browser not to drag.
    e.preventDefault();
  }
}

function setCurrentDragSourceNode(node: Element | null) {
  clearCurrentDragSourceNode();
  currentDragSourceNode = node;

  // A timeout of > 0 is necessary to resolve Firefox issue referenced
  // See:
  //   * https://github.com/react-dnd/react-dnd/pull/928
  //   * https://github.com/react-dnd/react-dnd/issues/869
  const MOUSE_MOVE_TIMEOUT = 1000;

  // Receiving a mouse event in the middle of a dragging operation
  // means it has ended and the drag source node disappeared from DOM,
  // so the browser didn't dispatch the dragend event.
  //
  // We need to wait before we start listening for mousemove events.
  // This is needed because the drag preview needs to be drawn or else it fires an 'mousemove' event
  // immediately in some browsers.
  //
  // See:
  //   * https://github.com/react-dnd/react-dnd/pull/928
  //   * https://github.com/react-dnd/react-dnd/issues/869
  //
  mouseMoveTimeoutTimer = setTimeout(() => {
    return (
      window &&
      window.addEventListener(
        'mousemove',
        endDragIfSourceWasRemovedFromDOM,
        true,
      )
    );
  }, MOUSE_MOVE_TIMEOUT);
}

function clearCurrentDragSourceNode() {
  if (currentDragSourceNode) {
    currentDragSourceNode = null;

    if (window) {
      window.clearTimeout(mouseMoveTimeoutTimer || undefined);
      window.removeEventListener(
        'mousemove',
        endDragIfSourceWasRemovedFromDOM,
        true,
      );
    }

    mouseMoveTimeoutTimer = null;
    return true;
  }

  return false;
}

const isNodeInDocument = (node: Node | null) => {
  // Check the node either in the main document or in the current context
  return (
    (!!document && document.body.contains(node)) ||
    (!!window && window.document.body.contains(node))
  );
};

function getCurrentSourcePreviewNodeOptions() {
  //TODO: monitor
  const sourceId = 'ITEM'; //this.monitor.getSourceId();

  const localSourcePreviewNodeOptions = sourcePreviewNodeOptions.get(sourceId);

  return {
    anchorX: 0.5,
    anchorY: 0.5,
    captureDraggingState: false,
    ...(localSourcePreviewNodeOptions || {}),
  };
}

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

export function connectDropTarget(node: HTMLElement, targetId: string) {
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
