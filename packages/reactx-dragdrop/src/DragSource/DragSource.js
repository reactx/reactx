/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useRef, useEffect} from 'react';
import {connectDragSource} from '../DragUtils';
import {useDragDropContextDispatch} from '../ContextManager';
import {type DragSourceProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrag(props: DragSourceProps) {
  const dispatch = useDragDropContextDispatch();
  const ref = useRef(null);

  const dragStart = (e: EventTarget) => {
    let payload = {
      source: ref.current,
      ...props,
      clonable: props.clonable || false,
    };
    dispatch({
      type: Actions.BEGIN_DRAG,
      payload,
    });
    if (props.onDragStart) {
      props.onDragStart(e);
    }
  };

  const drag = (element: ConnectableElement) => {
    ref.current = element;
    connectDragSource(element, {
      dragImage: props.handler,
      dragStart,
      props,
    });
  };

  return [drag];
}

function DragSource(props: DragSourceProps) {
  const [drag] = useDrag(props);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref]);

  return (
    <div ref={ref} {...props} style={props.cssSource}>
      {props.children}
    </div>
  );
}

export default DragSource;
