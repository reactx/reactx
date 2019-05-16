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
import {DragDropContext} from '../ContextManager';
export type DragSourceProps = {
  index: number,
  cssTarget: any,
  children: RElement<any>,
  handler?: Element,
  clonable: boolean,
};

export function useDrag() {
  const context = React.useContext(DragDropContext);
  function dragStart(e: EventTarget) {
    context.updateCurrentNode(e);
  }

  return [dragStart];
}

export default function DragSource(props: DragSourceProps) {
  const dropEffect = props.clonable ? 'copy' : 'move';

  const [dragStart] = useDrag();
  const draggableRef = React.useCallback(node => {
    if (node !== null) {
      return connectDragSource(node, {
        dropEffect,
        dragStart,
        dragImage: props.handler,
      });
    }
  }, []);

  return (
    <div style={{display: 'inline', ...props.cssTarget}} ref={draggableRef}>
      {props.children}
    </div>
  );
}
