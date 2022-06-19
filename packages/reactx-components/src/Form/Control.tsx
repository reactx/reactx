/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import clsx from 'clsx';
import React, {ForwardedRef} from 'react';
import '../assets/elements.form-control.scss';

export interface ControlPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  forawardedRef?: ForwardedRef<HTMLInputElement>;
}

const ControlComponent = (props: ControlPropsType) => {
  const {forawardedRef, className, ...restProps} = props;
  return (
    <input
      ref={forawardedRef}
      className={clsx('x-form-control', className)}
      {...restProps}></input>
  );
};

const Control = React.forwardRef<HTMLInputElement, ControlPropsType>(
  (props, ref) => <ControlComponent {...props} forawardedRef={ref} />,
);

Control.displayName = 'Control';
export default Control;
