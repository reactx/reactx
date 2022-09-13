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
import '../assets/elements.form-control.scss';

export interface ControlPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Control = forwardRef<HTMLInputElement, ControlPropsType>((props, ref) => {
  const {className, ...restProps} = props;
  return (
    <input
      ref={ref}
      className={clsx('x-form-control', className)}
      {...restProps}></input>
  );
});

Control.displayName = 'Control';
export default Control;
