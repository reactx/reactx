/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useCallback, type Element} from 'react';
import {connectDropTarget} from '../HTML5Backend';

export type DropTargetProps = {
  index: number,
  componentType: string,
  children(): Element<any>,
};

export default function DropTarget(props: DropTargetProps) {
  const sourceType = props.componentType
    ? props.componentType
    : 'UnknownTarget';

  const droppableRef = useCallback(node => {
    if (node !== null) {
      return connectDropTarget(node, sourceType);
    }
  }, []);

  return <div ref={droppableRef}>{props.children}</div>;
}
