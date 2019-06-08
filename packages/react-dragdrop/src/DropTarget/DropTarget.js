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
import type {DragDropManagerType} from '../DragDropManager';

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
    source: EventTarget,
    sourceElement: ReactElement,
  ) => void,
|};

export function useDrop(
  context: DragDropManagerType,
  stateCallback: Function,
  props: DropTargetProps,
) {
  let index = 1;
  function drop(event: EventTarget) {
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
    if (props.onDrop) {
      props.onDrop(event, context.getCurrentNode(), newReactEmenet);
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

export default function DropTarget(props: DropTargetProps) {
  const [children, setChildren] = React.useState([]);
  const context = React.useContext(DragDropContext);

  const stateCallback = newChild => {
    setChildren(c => c.concat(newChild));
  };

  const droppableRef = React.useCallback(node => {
    if (node !== null) {
      const [drop, dragOver, dragEnter, dragLeave] = useDrop(
        context,
        stateCallback,
        props,
      );
      return connectDropTarget(node, {
        drop,
        dragEnter,
        dragOver,
        dragLeave,
        dropEffect: props.dropEffect || 'move',
      });
    }
  }, []);

  return (
    <div style={props.style} ref={droppableRef}>
      {CloningElement(props.children, children)}
    </div>
  );
}
