/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {cloneElement, useState, useRef, useEffect, memo, Children} from 'react';
import uuid from 'uuid';

import {connectDropTarget} from '../DropUtils';
import {useDragDropContext} from '../ContextManager';
import {FindReactElement} from '../ElementUtils';
import {type DropTargetProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrop(props: DropTargetProps) {
  const {item, dispatch} = useDragDropContext();

  function drop(event: EventTarget, targetId: string | null) {
    if (!item.source) {
      return;
    }

    if (
      props.canDropByClassNames &&
      Array.from(item.source.classList).filter(c =>
        props.canDropByClassNames.includes(c),
      ).length === 0
    ) {
      return;
    }

    const currentReactNode = FindReactElement(item.source);

    const newReactEmenet = cloneElement(
      currentReactNode,
      {
        ...currentReactNode.memoizedProps,
        key: uuid.v4(),
        ref: node => {
          const {ref} = currentReactNode;
          if (typeof ref === 'function') {
            ref(node, {...props, clonable: false, sourceId: item.sourceId});
          }
        },
      },
      [...currentReactNode.memoizedProps.children],
    );

    let payload = {
      newItem: newReactEmenet,
      sourceId: item.sourceId,
      source: item.source,
      target: event,
      targetId,
    };

    if (props.onDrop) {
      props.onDrop(event, currentReactNode, payload);
    }

    dispatch({
      type: Actions.DROP,
      payload,
    });

    if (item.clonable !== true) {
      currentReactNode.stateNode.remove();
    }
  }
  function dragEnter(event: EventTarget, targetId: string | null) {
    if (props.onDragEnter) {
      props.onDragEnter(event);
    }
  }
  function dragOver(event: EventTarget, targetId: string | null) {
    if (props.onDragOver) {
      props.onDragOver(event);
    }
  }
  function dragLeave(event: EventTarget, targetId: string | null) {
    if (props.onDragLeave) {
      props.onDragLeave(event);
    }
  }
  return [drop, dragOver, dragEnter, dragLeave];
}

function CloningElement(target, children) {
  return Children.map(target, Target => {
    //TODO: define target based on offset
    return cloneElement(Target, {
      children: [target.props.children, ...children],
    });
  });
}

function Component(props: DropTargetProps) {
  const [targetId, setTargetId] = useState(null);
  const {item} = useDragDropContext();
  const [children, setChildren] = useState([]);
  const dropRef = useRef(null);

  const [drop, dragOver, dragEnter, dragLeave] = useDrop(props);

  useEffect(() => {
    if (props.forwardedref) {
      props.forwardedref = dropRef;
    }
    let tempTargetId: string | null = targetId;
    if (tempTargetId === null) {
      setTargetId(uuid.v4());
    }

    if (item && item.didDrop === true && item.targetId === targetId) {
      setChildren(c => c.concat(item.newItem));
    }

    if (item) {
      return connectDropTarget(dropRef.current, {
        targetId: tempTargetId,
        drop,
        dragEnter,
        dragOver,
        dragLeave,
      });
    }
  }, [item]);

  return (
    <div style={props.style} ref={dropRef}>
      {CloningElement(props.children, children)}
    </div>
  );
}

const DropTarget: any = memo((props: DropTargetProps) => {
  return (
    <Component {...props} forwardedref={props.ref}>
      {props.children}
    </Component>
  );
});

export default DropTarget;
