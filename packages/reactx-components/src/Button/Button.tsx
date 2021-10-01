/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';
import {Loading} from '../Loading/Loading';
import {ButtonVariant, Variant} from '../types';
import '../assets/elements.button.scss';

export interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorVariant?: Variant;
  forawardedRef?: ForwardedRef<HTMLButtonElement>;
  loading?: boolean | React.ReactNode;
}

const ButtonComponent = (props: ButtonPropsType) => {
  const {
    forawardedRef,
    loading,
    className,
    children,
    variant,
    colorVariant,
    ...restProps
  } = props;

  return (
    <button
      role="button"
      ref={forawardedRef}
      className={classNames(
        'x-btn',
        'x-btn--' + variant,
        'x-btn--' + colorVariant,
        className,
      )}
      {...restProps}>
      {children}
      {loading && (typeof loading === 'boolean' ? <Loading /> : loading)}
    </button>
  );
};

const Button = forwardRef<HTMLButtonElement, ButtonPropsType>((props, ref) => {
  return <ButtonComponent {...props} forawardedRef={ref} />;
});

Button.defaultProps = {
  type: 'button',
  variant: 'normal',
  colorVariant: 'primary',
};

Button.displayName = 'Button';
export {Button};
