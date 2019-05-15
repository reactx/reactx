/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { type Element, type Node } from 'react';
import { connectDropTarget } from '../DropUtils';
import { DragDropContext } from '../ContextManager';
import { FindReactElement } from '../ElementUtils';

export type DropTargetProps = {
  index: number,
  componentType: string,
  children: Element<any>,
};

var index = 1;

export function useDrop(target) {
  const context = React.useContext(DragDropContext);
  const [children, setChildren] = React.useState(target);
  function drop(e: Node) {
    debugger;
    
    const currentReactNode = FindReactElement(context.getCurrentNode());
    const newReactEmenet = React.cloneElement(
      currentReactNode,
      {
        key: ++index,
        ref: (node) => {
          const { ref } = currentReactNode;
          if (typeof ref === 'function') {
            ref(node);
          }
        }
      },
      [...currentReactNode.memoizedProps.children]
    );

    const preparedTarget = React.Children.map(target, Target => {
      let elements = React.Children.toArray(FindReactElement(e).memoizedProps.children);
      //TODO: define target based on offset
      return React.cloneElement(Target, { children: [...elements, newReactEmenet] });
    });

    setChildren(preparedTarget);
  }
  function dragEnter(e: Node) {
    // debugger;
    //  e.preventDefaultValue();
    // })
    // connectDropTarget(newelement.ref, { drop, dragEnter, dragOver });
  }

  function dragOver(event: Node) {
    // event.preventDefault();
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