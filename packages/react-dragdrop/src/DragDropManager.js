/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type DragDropManagerType = {
  getCurrentNode(): EventTarget | null,
  updateCurrentNode(target: EventTarget): void,
};

export default function DragDropManager(): DragDropManagerType {
  let node: EventTarget | null = null;

  function getCurrentNode(): EventTarget | null {
    return node;
  }

  function updateCurrentNode(target: EventTarget) {
    node = target;
  }

  return {
    updateCurrentNode,
    getCurrentNode,
  };
}
