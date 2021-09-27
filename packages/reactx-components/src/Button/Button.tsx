/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef, forwardRef} from 'react';
import Loading from '../Loading/Loading';
import {ButtonVariant} from '../types';

export interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  forawardedRef?: ForwardedRef<HTMLButtonElement>;
  loading?: boolean | React.ReactNode;
}

const ButtonComponent = (props: ButtonPropsType) => {
  const {forawardedRef, loading, className, children, ...restProps} = props;

  return (
    <button
      role="button"
      ref={forawardedRef}
      className={classNames('x-btn', className)}
      {...props}>
      {children}
      {loading && (typeof loading === 'boolean' ? <Loading /> : loading)}
    </button>
  );
};

const Button: FC<ButtonPropsType> = forwardRef<
  HTMLButtonElement,
  ButtonPropsType
>((props, forawardedRef) => {
  return <ButtonComponent {...props} forawardedRef={forawardedRef} />;
});

Button.defaultProps = {
  type: 'button',
  variant: 'normal',
};

Button.displayName = 'Button';
export default Button;
