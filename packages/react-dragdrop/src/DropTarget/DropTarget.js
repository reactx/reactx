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
import {DragDropContext} from '../ContextManager';
import {FindReactElement} from '../ElementUtils';

export type DropTargetProps = {
  index: number,
  componentType: string,
  children: Element<any>,
};

export function useDrop(context, stateCallback) {
  let index = 1;
  function drop(e: Node) {
    const currentReactNode = FindReactElement(context.getCurrentNode());
    const newReactEmenet = React.cloneElement(
      currentReactNode,
      {
        key: ++index,
        ref: node => {
          const {ref} = currentReactNode;
          if (typeof ref === 'function') {
            ref(node);
          }
        },
      },
      [...currentReactNode.memoizedProps.children],
    );

    stateCallback(newReactEmenet);
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
  return [drop, dragOver, dragEnter];
}

function CloningElement(target, children) {
  return React.Children.map(target, Target => {
    //TODO: define target based on offset
    return React.cloneElement(Target, {children});
  });
}

export default function DropTarget(props: DropTargetProps) {
  const [children, setChildren] = React.useState([]);
  const context = React.useContext(DragDropContext);

  const stateCallback = newChild => {
    setChildren(c => c.concat(newChild));
  };

  const droppableRef = React.useCallback(node => {
    if (node !== null) {
      const [drop, dragOver, dragEnter] = useDrop(context, stateCallback);
      return connectDropTarget(node, {drop, dragEnter, dragOver});
    }
  }, []);

  return (
    <div ref={droppableRef}>{CloningElement(props.children, children)}</div>
  );
}
