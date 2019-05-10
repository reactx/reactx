/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { type Element, type Node } from 'react';
import { connectDragSource } from '../DragUtils';
import { DragDropContext } from '../ContextManager'
export type DragSourceProps = {
  index: number,
  cssTarget: any,
  children: Element<any>,
  clonable: boolean,
};

export function useDrag() {
  const context = React.useContext(DragDropContext);
  function dragStart(e: Node) {
    context.updateCurrentNode(e);
  }

  return [dragStart];
}

export default function DragSource(props: DragSourceProps) {
  const dropEffect = props.clonable ? 'copy' : 'move';
  
  const [dragStart] = useDrag();
  const draggableRef = React.useCallback(node => {
    if (node !== null) {
      return connectDragSource(node, { dropEffect, dragStart });
    }
  }, []);

  return (
    <div style={{ display: 'inline', ...props.cssTarget }} ref={draggableRef}>
      {props.children}
    </div>
  );
}
