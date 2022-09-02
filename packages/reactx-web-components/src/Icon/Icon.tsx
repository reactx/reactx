/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';

import '../assets/elements.icon.scss';

export interface SvgIconPropsType
  extends React.SVGAttributes<HTMLOrSVGElement> {}

const SvgIcon = forwardRef<HTMLOrSVGElement, SvgIconPropsType>((props, ref) => {
  const {className, children, ...restProps} = props;

  const shared: any = {
    ref,
    className: clsx('x-icon', className),
  };

  return (
    <svg ref={ref} {...shared} verticalAlign='middle' {...restProps}>
      {children}
    </svg>
  );
});

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24',
};

SvgIcon.displayName = 'Icon';
export {SvgIcon};
