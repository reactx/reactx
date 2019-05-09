/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { type Element } from 'react';
import { connectDropTarget } from '../DropUtils';

export type DropTargetProps = {
  index: number,
  componentType: string,
  children(): Element<any>,
};

export default function DropTarget(props: DropTargetProps) {
  const sourceType = props.componentType
    ? props.componentType
    : 'UnknownTarget';

  //TODO: useCallback hook
  //__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__
  const droppableRef = node => {
    if (node !== null) {
      return connectDropTarget(node, {});
    }
  };

  return <div ref={droppableRef}>{props.children}</div>;
}
