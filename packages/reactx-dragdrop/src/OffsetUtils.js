import {isSafari, isFirefox} from 'shared/BrowserDetector';
import MonotonicInterpolant, {interpolate} from './MonotonicInterpolant';
import type {XYCoord} from './ReactDnD';

const ELEMENT_NODE = 1;

export function getNodeClientOffset(node: any) {
  const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

  if (!el) {
    return null;
  }

  const {top, left} = el.getBoundingClientRect();
  return {x: left, y: top};
}

export function getEventClientOffset(e: any) {
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

function isImageNode(node: any) {
  return (
    node.nodeName === 'IMG' &&
    (isFirefox() ||
      (document.documentElement && !document.documentElement.contains(node)))
  );
}

function getDragPreviewSize(
  isImage: boolean,
  dragPreview: any,
  sourceWidth: number,
  sourceHeight: number,
) {
  let dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  let dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;

  // Work around @2x coordinate discrepancies in browsers
  if (isSafari() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  }
  return {dragPreviewWidth, dragPreviewHeight};
}

export function getDragPreviewOffset(
  sourceNode: any,
  dragPreview: any,
  clientOffset: XYCoord,
  anchorPoint: any,
  offsetPoint: any,
) {
  // The browsers will use the image intrinsic size under different conditions.
  // Firefox only cares if it's an image, but WebKit also wants it to be detached.
  const isImage = isImageNode(dragPreview);
  const dragPreviewNode = isImage ? sourceNode : dragPreview;
  const dragPreviewNodeOffsetFromClient: XYCoord = getNodeClientOffset(
    dragPreviewNode,
  );
  const offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y,
  };
  const {offsetWidth: sourceWidth, offsetHeight: sourceHeight} = sourceNode;
  const {anchorX, anchorY} = anchorPoint;
  const {dragPreviewWidth, dragPreviewHeight} = getDragPreviewSize(
    isImage,
    dragPreview,
    sourceWidth,
    sourceHeight,
  );

  const calculateYOffset = () => {
    const interpolantY = MonotonicInterpolant(
      [0, 0.5, 1],
      [
        // Dock to the top
        offsetFromDragPreview.y,
        // Align at the center
        (offsetFromDragPreview.y / sourceHeight) * dragPreviewHeight,
        // Dock to the bottom
        offsetFromDragPreview.y + dragPreviewHeight - sourceHeight,
      ],
    );
    let y = interpolate(interpolantY, anchorY);
    // Work around Safari 8 positioning bug
    if (isSafari() && isImage) {
      // We'll have to wait for @3x to see if this is entirely correct
      y += (window.devicePixelRatio - 1) * dragPreviewHeight;
    }
    return y;
  };

  const calculateXOffset = () => {
    // Interpolate coordinates depending on anchor point
    // If you know a simpler way to do this, let me know
    const interpolantX = MonotonicInterpolant(
      [0, 0.5, 1],
      [
        // Dock to the left
        offsetFromDragPreview.x,
        // Align at the center
        (offsetFromDragPreview.x / sourceWidth) * dragPreviewWidth,
        // Dock to the right
        offsetFromDragPreview.x + dragPreviewWidth - sourceWidth,
      ],
    );
    return interpolate(interpolantX, anchorX);
  };

  // Force offsets if specified in the options.
  const {offsetX, offsetY} = offsetPoint;
  const isManualOffsetX = offsetX === 0 || offsetX;
  const isManualOffsetY = offsetY === 0 || offsetY;
  return {
    x: isManualOffsetX ? offsetX : calculateXOffset(),
    y: isManualOffsetY ? offsetY : calculateYOffset(),
  };
}
