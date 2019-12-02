/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useRef, useEffect, forwardRef, useCallback} from 'react';
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
    if (!item.sourceTag) {
      return;
    }

    if (
      props.canDropByClassNames &&
      Array.from(item.sourceTag.classList).filter(c =>
        props.canDropByClassNames.includes(c),
      ).length === 0
    ) {
      return;
    }

    let payload = {
      component: item.component,
      sourceTag: item.sourceTag,
      target: event,
    };

    if (props.onDrop) {
      props.onDrop(event, item.component || item.sourceTag, payload);
    }

    // dispatch({
    //   type: Actions.DROP,
    //   payload,
    // });

    if (item.clonable !== true) {
      item.sourceTag.remove();
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

function Component(props: DropTargetProps) {
  const [drop] = useDrop(props);
  const ref = useRef(props.ref);

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [ref]);

  return (
    <div style={props.style} ref={ref} {...props}>
      {/* {CloningElement(props.children, children)} */}
      {props.children}
    </div>
  );
}

const DropTarget: any = forwardRef((props: DropTargetProps, ref) => {
  return (
    <Component {...props} ref={ref}>
      {props.children}
    </Component>
  );
});

export default DropTarget;
