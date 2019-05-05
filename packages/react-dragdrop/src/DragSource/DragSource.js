/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import {DragSource} from 'react-dnd';

function DragSourceComponent(props) {
  return <Component {...props} />;
}

function Component({isDragging, dragSource, props}) {
  return dragSource(<div>{props.children}</div>);
}

const Source = {
  beginDrag: props => ({...props}),
};

function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource('CP', Source, collect)(DragSourceComponent);
