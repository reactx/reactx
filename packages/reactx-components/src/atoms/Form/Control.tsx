/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef} from 'react';

export interface ControlPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  forawardedRef?: ForwardedRef<HTMLInputElement>;
}

const ControlComponent = (props: ControlPropsType) => {
  const {forawardedRef, className, ...restProps} = props;
  return (
    <input
      ref={forawardedRef}
      className={classNames('x-form-control', className)}
      {...restProps}></input>
  );
};

const Control: FC<ControlPropsType> = React.forwardRef<
  HTMLInputElement,
  ControlPropsType
>((props, forawardedRef) => (
  <ControlComponent {...props} forawardedRef={forawardedRef} />
));

Control.displayName = 'Control';
export default Control;
