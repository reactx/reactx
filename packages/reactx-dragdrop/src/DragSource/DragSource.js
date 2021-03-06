/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 
 */

import {useCallback, useRef} from 'react';
import {DragSourceProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';
import {useDragDropContextDispatch} from '../ContextManager';
import {connectDragSource} from '../DragUtils';

export function useDrag(props: DragSourceProps = {}) {
  const dispatch = useDragDropContextDispatch();
  const el = useRef();

  const dragStart = useCallback((e: EventTarget) => {
    if (el.current?.isDragging === true) {
      return;
    }
    const payload = {
      source: e,
      ...props,
    };
    dispatch({
      type: Actions.BEGIN_DRAG,
      payload: {...payload, element: el.current},
    });
    if (props.onDragStart) {
      props.onDragStart(e);
    }
  }, []);

  const drag = useCallback((ref) => {
    if (!ref) {
      return;
    }
    el.current = ref;
    connectDragSource(ref, {
      dragImage: props.handler,
      dragStart,
      props,
    });
    return ref;
  }, []);

  return drag;
}
