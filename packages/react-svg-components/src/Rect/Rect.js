/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';

const SvgComponent = ({svgRef, ...props}) => (
  <svg width={40} height={40} ref={svgRef} {...props}>
    <path stroke="#000" fill="transparent" strokeWidth={5} d="M5 5h30v30H5z" />
  </svg>
);

const Rect = React.forwardRef((props, ref) => (
  <SvgComponent svgRef={ref} {...props} />
));
export default Rect;
