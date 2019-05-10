/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element, type Node} from 'react';
import {connectDropTarget} from '../DropUtils';
// import {DragDropContext} from '../ContextManager';

export type DropTargetProps = {
  index: number,
  componentType: string,
  children: Element<any>,
};

export function useDrop() {
  // const context = React.useContext(DragDropContext);
  function drop(target: Node) {}
  function dragEnter(target: Node) {}

  function dragOver(target: Node) {
    // let source = context.getCurrentNode();
  }
  return [drop, dragOver, dragEnter];
}

export default function DropTarget(props: DropTargetProps) {
  const [drop, dragOver, dragEnter] = useDrop();

  const droppableRef = React.useCallback(node => {
    if (node !== null) {
      return connectDropTarget(node, {drop, dragEnter, dragOver});
    }
  }, []);

  return <div ref={droppableRef}>{props.children}</div>;
}
