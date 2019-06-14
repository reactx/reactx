/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

type NodeEventType = EventTarget & {dropEffect: string};

export type DragDropManagerType = {
  getCurrentNode(): NodeEventType,
  updateCurrentNode(target: NodeEventType): void,
};

export default function DragDropManager(): DragDropManagerType {
  let node: NodeEventType;

  function getCurrentNode(): NodeEventType {
    return node;
  }

  function updateCurrentNode(target: NodeEventType) {
    node = target;
  }

  return {
    updateCurrentNode,
    getCurrentNode,
  };
}
