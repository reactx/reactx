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
import { DragDropContext } from '../ContextManager';
import { FindReactElement} from '../ElementUtils';

export type DropTargetProps = {
  index: number,
  componentType: string,
  children: Element<any>,
};

export function useDrop(childrens) {
  const context = React.useContext(DragDropContext);
  const [children, setChildren] = React.useState((childrens));
  function drop(e: Node) {
    debugger;
    let a = context.dragDropManager;
  }
  var index = 1;
  function dragEnter(e: Node) {
    debugger;
    let a = context.getCurrentNode();
    let reactNode = FindReactElement(a);
    // React.Children.map(FindReactElement(e.parentElement).memoizedProps.children, child => {
    let newelement = React.cloneElement(
      reactNode,
      {
        key: ++index,
        ref: (node) => {
          const { ref } = reactNode;
          if (typeof ref === 'function') {
            ref(node);
          }
        }
      },
      [...reactNode.memoizedProps.children]
    );

    childrens = [].concat(([].concat(FindReactElement(e.parentElement).memoizedProps.children),[].concat(childrens)),newelement)
    setChildren(childrens);
    // })
    // connectDropTarget(newelement.ref, { drop, dragEnter, dragOver });
  }

  function dragOver(e: Node) {
    debugger;
    let a = context.getCurrentNode();
  }
  return [drop, dragOver, dragEnter, children];
}

export default function DropTarget(props: DropTargetProps) {
  const [drop, dragOver, dragEnter, children] = useDrop(props.children);

  const droppableRef = React.useCallback(node => {
    if (node !== null) {
      return connectDropTarget(node, { drop, dragEnter, dragOver });
    }
  }, []);

  return <div ref={droppableRef}>{children}</div>;
   
}