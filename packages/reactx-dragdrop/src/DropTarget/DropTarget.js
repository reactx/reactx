/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useEffect, useCallback, useState} from 'react';
import * as uuid from 'uuid';
import {connectDropTarget} from '../DropUtils';
import {useDragDropContextState} from '../ContextManager';
import {type DropTargetProps} from '../../inline-typed';
import {useDragDropContextDispatch} from '../ContextManager';
import {Actions} from '../ActionTypes';

export function useDrop(props: DropTargetProps = {}, deps) {
  const dispatch = useDragDropContextDispatch();
  const item = useDragDropContextState();
  const [droppedComponent, setDroppedComponent] = useState(null);

  useEffect(() => {
    if (!droppedComponent || !item.source || !item.element.isDragging) return;

    if (
      props.canDropByClassNames &&
      Array.from(item.source.classList).filter((c) =>
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
    dispatch({
      type: Actions.DROP,
      payload: {...item},
    });

    return;
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

  const drop = useCallback((ref) => {
    if (!ref) return;
    connectDropTarget(ref, {
      drop: onDrop,
      dragEnter,
      dragOver,
      dragLeave,
    });
    return ref;
  }, []);

  return drop;
}
