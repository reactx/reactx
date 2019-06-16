/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element} from 'react';
import {connectDropTarget} from '../DropUtils';
import {DragDropContext} from '../ContextManager';
import {FindReactElement} from '../ElementUtils';

export type DropTargetProps = {|
  index: number,
  componentType: string,
  children: Element<any>,
  dropEffect: string,
  style: any,
  onDragLeave: (event: EventTarget) => void,
  onDragOver: (event: EventTarget) => void,
  onDragEnter: (event: EventTarget) => void,
  onDrop: (
    event: EventTarget,
    source: EventTarget | null,
    sourceElement: Element<any>,
  ) => void,
|};

export function useDrop(props: DropTargetProps, stateCallback: Function) {
  const context = React.useContext(DragDropContext);
  let index = 1;
  function drop(event: EventTarget) {
    const currentNode = context.getCurrentNode();
    const currentReactNode = FindReactElement(currentNode);

    const newReactEmenet = React.cloneElement(
      currentReactNode,
      {
        //TODO: use uuid
        key: ++index,
        localkey:
          currentNode.dropEffect === 'move'
            ? currentReactNode.memoizedProps.localkey
            : index++,
        ref: node => {
          const {ref} = currentReactNode;
          if (typeof ref === 'function') {
            if (currentNode.props) {
              currentNode.props.clonable = false;
            }
            ref(node, currentNode.props);
          }
        },
      },
      [...currentReactNode.memoizedProps.children],
    );
    
    stateCallback(newReactEmenet);
        
    if (props.onDrop) {
      props.onDrop(event, currentReactNode, newReactEmenet);
    }
    
    
    if (currentNode.dropEffect === 'move') {
      currentReactNode.stateNode.remove();
    }
  }
  function dragEnter(event: EventTarget) {
    if (props.onDragEnter) {
      props.onDragEnter(event);
    }
  }
  function dragOver(event: EventTarget) {
    if (props.onDragOver) {
      props.onDragOver(event);
    }
    // event.preventDefault();
  }
  function dragLeave(event: EventTarget) {
    if (props.onDragLeave) {
      props.onDragLeave(event);
    }
    // event.preventDefault();
  }
  return [drop, dragOver, dragEnter, dragLeave];
}

function CloningElement(target, children) {
  return React.Children.map(target, Target => {
    //TODO: define target based on offset
    return React.cloneElement(Target, {
      children: [target.props.children, ...children],
    });
  });
}

//TODO:Change to memoizable CP
export default function DropTarget(props: DropTargetProps) {
  const context = React.useContext(DragDropContext);
  const [children, setChildren] = React.useState([]);

  //TODO: change this to reducer
  const stateCallback = newChild => {
    setChildren(c => c.concat(newChild));
    //remove last drag source element
    context.updateCurrentNode(null);
  };
  const [drop, dragOver, dragEnter, dragLeave] = useDrop(props, stateCallback);

  const droppableRef = React.useCallback(node => {
    if (node !== null) {
      return connectDropTarget(node, {
        drop,
        dragEnter,
        dragOver,
        dragLeave,
        context,
      });
    }
  }, []);

  return (
    <div style={props.style} ref={droppableRef}>
      {CloningElement(props.children, children)}
    </div>
  );
}
