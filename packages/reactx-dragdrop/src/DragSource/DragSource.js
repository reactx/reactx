/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useRef, useEffect, useCallback} from 'react';
import {connectDragSource} from '../DragUtils';
import {useDragDropContextDispatch} from '../ContextManager';
import {type DragSourceProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrag(props: DragSourceProps = {}) {
  const el = useRef(null);
  const dispatch = useDragDropContextDispatch();
  const {refKey = 'ref', ...rest} = props;
  const dragStart = useCallback((e: EventTarget) => {
    if (el.current.isDragging === true) return;
    let payload = {
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
  useEffect(() => {
    if (!el.current) return;

    connectDragSource(el.current, {
      dragImage: props.handler,
      dragStart,
      props,
    });
    return;
  }, [el.current]);

  return {
    [refKey]: el,
    ...rest,
  };
}
