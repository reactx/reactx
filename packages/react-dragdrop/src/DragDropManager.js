import type { Node } from 'react';

export type DragDropManagerType = {|
  getCurrentNode(): Node,
  updateCurrentNode(target: Node): void,
  |}

export default function DragDropManager() : DragDropManagerType {
  let node: Node | null = null;

  function getCurrentNode(): Node | null {
    return node;
  }

  function updateCurrentNode(target: Node) {
    node = target;
  }

  return {
    updateCurrentNode,
    getCurrentNode
  }
}