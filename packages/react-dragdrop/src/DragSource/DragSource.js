/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import uuid from 'uuid';

import {connectDragSource} from '../DragUtils';
import {useDragDropContext} from '../ContextManager';
import {type DragSourceProps} from '../../inline-typed';
import {Actions} from '../ActionTypes';

export function useDrag(props: DragSourceProps) {
  const [dispatch] = useDragDropContext();

  function dragStart(e: EventTarget) {
    let payload = {
      source: e,
      clonable: props.clonable,
      sourceId: uuid.v4(),
    };
    dispatch({
      type: Actions.BEGIN_DRAG,
      payload,
    });
    if (props.onDragStart) {
      props.onDragStart(e);
    }
  }

  return [dragStart];
}

function Component(props: DragSourceProps) {
  const [dragStart] = useDrag(props);

  const dragRefCallback = React.useCallback((node: any) => {
    if (node !== null) {
      if (props.forwardedref) {
        props.forwardedref.current = node;
      }

      return connectDragSource(node, {
        dragImage: props.handler,
        dragStart,
        props: props,
      });
    }
  }, []);

  //Clean Unknown Props
  const userProps = Object.assign({}, props);
  delete userProps.clonable;
  delete userProps.handler;

  return (
    <div ref={dragRefCallback} {...userProps} style={props.cssTarget}>
      {props.children}
    </div>
  );
}

const DragSource: any = React.memo((props: DragSourceProps) => {
  return (
    <Component {...props} forwardedref={props.ref}>
      {props.children}
    </Component>
  );
});

export default DragSource;
