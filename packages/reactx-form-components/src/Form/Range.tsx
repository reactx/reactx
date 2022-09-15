/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import '../assets/elements.range.scss';

export interface RangePropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Range = forwardRef<HTMLInputElement, RangePropsType>((props, ref) => {
  const {className, ...restProps} = props;
  return (
    <input
      ref={ref}
      type={'range'}
      className={clsx('x-form-control','x-range', className)}
      {...restProps}></input>
  );
});

Range.displayName = 'Range';
export default Range;
