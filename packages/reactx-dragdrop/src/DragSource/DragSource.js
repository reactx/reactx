/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {forwardRef, useRef, useEffect} from 'react';
import {connectDragSource} from '../DragUtils';
import {useDragDropContextDispatch} from '../ContextManager';
import {type DragSourceProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrag(props: DragSourceProps) {
  const dispatch = useDragDropContextDispatch();
  const ref = useRef(null);

  const dragStart = (e: EventTarget) => {
    let payload = {
      sourceTag: ref.current,
      clonable: props.clonable,
      component: props.component,
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

function Component(props: DragSourceProps) {
  const [drag] = useDrag(props);
  const ref = useRef(props.ref);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref]);

  // const dragRefCallback = useCallback((node: any) => {
  //   if (node !== null) {
  //     if (props.ref) {
  //       props.ref.current = node;
  //     }

  //     return connectDragSource(node, {
  //       dragImage: props.handler,
  //       dragStart,
  //       props,
  //     });
  //   }
  // }, []);

  //Clean Unknown Props
  // const userProps = Object.assign({}, props);
  // delete userProps.clonable;
  // delete userProps.handler;

  return (
    <div ref={ref} {...props} style={props.cssSource}>
      {props.children}
    </div>
  );
}

const DragSource: any = forwardRef((props: DragSourceProps, ref) => {
  return (
    <Component {...props} ref={ref}>
      {props.children}
    </Component>
  );
});

export default DragSource;
