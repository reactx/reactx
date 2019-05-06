/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element} from 'react';
import {connectDragSource} from '../HTML5Backend';

export type DragSourceProps = {
  index: number,
  componentType: string,
  children(): Element<any>,
  clonable: boolean,
};

export default function DragSource(props: DragSourceProps) {
  const dropEffect = props.clonable ? 'copy' : 'move';
  const sourceType = props.componentType
    ? props.componentType
    : 'UnknownTarget';

  const refCallback = element => {
    if (element) {
      return connectDragSource(element, sourceType, {dropEffect});
    }
  };

  return <div ref={refCallback}>{props.children}</div>;
}
