/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element} from 'react';
import {connectDragSource} from '../DragUtils';

export type DragSourceProps = {
  index: number,
  cssTarget: any,
  children(): Element<any>,
  clonable: boolean,
};

export default function DragSource(props: DragSourceProps) {
  const dropEffect = props.clonable ? 'copy' : 'move';

  //TODO: useCallback hook
  //__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__
  const draggableRef = node => {
    if (node !== null) {
      return connectDragSource(node, {dropEffect});
    }
  };

  return (
    <div style={{display: 'inline', ...props.cssTarget}} ref={draggableRef}>
      {props.children}
    </div>
  );
}
