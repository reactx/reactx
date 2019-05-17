/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element as RElement, type Ref} from 'react';
import {connectDragSource} from '../DragUtils';
import {DragDropContext} from '../ContextManager';
export type DragSourceProps = {
  index?: number,
  cssTarget?: any,
  children: RElement<any>,
  handler?: Element,
  clonable?: boolean,
  forwardedRef?: Ref<any>,
  onDragStart(e: EventTarget): void,
};

export function useDrag(props: DragSourceProps) {
  const context = React.useContext(DragDropContext);
  function dragStart(e: EventTarget) {
    if (typeof context.updateCurrentNode === 'function') {
      context.updateCurrentNode(e);
    }

    if (props.onDragStart) {
      props.onDragStart(e);
    }
  }

  return [dragStart];
}

function Component(props: DragSourceProps) {
  const dropEffect = props.clonable ? 'copy' : 'move';

  const [dragStart] = useDrag(props);

  const refDraggable = React.useCallback(node => {
    if (node !== null) {
      if (props.forwardedRef) {
        props.forwardedRef.current = node;
      }

      connectDragSource(node, {
        dropEffect,
        dragStart,
        dragImage: props.handler,
      });
    }
    return node;
  }, []);

  return (
    <div style={{display: 'inline', ...props.cssTarget}} ref={refDraggable}>
      {props.children}
    </div>
  );
}

const DragSource = React.forwardRef((props: DragSourceProps, ref: Ref<any>) => {
  return (
    <Component {...props} forwardedRef={ref}>
      {props.children}
    </Component>
  );
});

export default DragSource;
