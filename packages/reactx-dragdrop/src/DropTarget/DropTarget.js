/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  forwardRef,
} from 'react';
import uuid from 'uuid';
import {connectDropTarget} from '../DropUtils';
import {useDragDropContextState} from '../ContextManager';
import {FindReactElement} from '../ElementUtils';
import {type DropTargetProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrop(props: DropTargetProps, deps) {
  const item = useDragDropContextState();
  const [droppedComponent, setDroppedComponent] = useState(null);

  useEffect(() => {
    if (!droppedComponent || !item.source) return;

    if (
      props.canDropByClassNames &&
      Array.from(item.source.classList).filter(c =>
        props.canDropByClassNames.includes(c),
      ).length === 0
    ) {
      return;
    }

    if (props.onDrop) {
      props.onDrop(droppedComponent.event, item.source, {
        sourceProps: item,
        source: item.source,
        target: droppedComponent.event,
        targetProps: props,
      });
    }
  }, [droppedComponent]);

  const onDrop = useCallback((event: EventTarget) => {
    setDroppedComponent({event, id: uuid.v4()});
  }, []);

  const dragEnter = useCallback((event: EventTarget) => {
    if (props.onDragEnter) {
      props.onDragEnter(event);
    }
  }, []);
  const dragOver = useCallback((event: EventTarget) => {
    if (props.onDragOver) {
      props.onDragOver(event);
    }
  }, []);
  const dragLeave = useCallback((event: EventTarget) => {
    if (props.onDragLeave) {
      props.onDragLeave(event);
    }
  }, []);

  const drop = useCallback((element: ConnectableElement) => {
    connectDropTarget(element, {
      drop: onDrop,
      dragEnter,
      dragOver,
      dragLeave,
    });
  }, []);
  return [drop];
}

function DropTarget(props: DropTargetProps) {
  const [drop] = useDrop(props);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
      if (props.forwardedref) props.forwardedref.current = ref.current;
    }
  }, [ref]);

  return (
    <div style={props.style} ref={ref} {...props}>
      {props.children}
    </div>
  );
}

export default forwardRef((props, ref) => (
  <DropTarget forwardedref={ref} {...props}></DropTarget>
));
