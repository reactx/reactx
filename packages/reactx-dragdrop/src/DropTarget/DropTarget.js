/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useRef, useEffect, useCallback} from 'react';
import uuid from 'uuid';
import {connectDropTarget} from '../DropUtils';
import {useDragDropContextState} from '../ContextManager';
import {FindReactElement} from '../ElementUtils';
import {type DropTargetProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrop(props: DropTargetProps, deps) {
  const item = useDragDropContextState();
  const itemRef = useRef(item);
  itemRef.current = item;
  const onDrop = useCallback((event: EventTarget) => {
    let item = itemRef.current;
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

    let payload = {
      sourceProps: item,
      source: item.source,
      target: event,
      targetProps: props,
    };

    if (props.onDrop) {
      props.onDrop(event, item.source, payload);
    }
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
    }
  }, [ref]);

  return (
    <div style={props.style} ref={ref} {...props}>
      {props.children}
    </div>
  );
}

export default DropTarget;
