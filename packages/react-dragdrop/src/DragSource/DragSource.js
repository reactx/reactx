/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element as RElement} from 'react';
import {connectDragSource} from '../DragUtils';
import {useDragDropContext} from '../ContextManager';
export type DragSourceProps = {
  index?: number,
  cssTarget?: any,
  children: RElement<any>,
  handler?: Element,
  clonable?: boolean,
  forwardedRef: any,
  onDragStart(e: EventTarget): void,
};

export function useDrag(props: DragSourceProps) {
  const context = React.useContext(DragDropContext);
  function dragStart(e: EventTarget & {dropEffect: string, props: any}) {
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
  const [dragStart] = useDrag(props);
  const [dnd, dispatch] = useDragDropContext();

  const refDraggable = React.useCallback((node: any, dynamicPops) => {
    //dynamicPops is type of DragSourceProps
    if (node !== null) {
      const useProps = {...props, ...dynamicPops};

      if (useProps.forwardedRef) {
        useProps.forwardedRef.current = node;
      }

      connectDragSource(node, {
        dragImage: props.handler,
        dragStart,
        props: useProps,
      });
    }
    return node;
  }, []);

  return (
    <div style={props.cssTarget} ref={refDraggable}>
      {props.children}
    </div>
  );
}

//TODO:Change to memoizable CP
const DragSource: any = React.forwardRef((props: DragSourceProps, ref: any) => {
  return (
    <Component {...props} forwardedRef={ref}>
      {props.children}
    </Component>
  );
});

export default DragSource;
