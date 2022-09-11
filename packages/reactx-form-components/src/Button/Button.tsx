/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import '../assets/elements.button.scss';
import {Loading} from '../Loading/Loading';
import {ButtonVariant, SpinnerPlacement, Variant} from '../types';

export interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorVariant?: Variant;
  loadingText?: string;
  spinnerPlacement?: SpinnerPlacement;
  loading?: boolean | React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonPropsType>((props, ref) => {
  const {
    loading,
    className,
    spinnerPlacement,
    children,
    loadingText,
    variant,
    colorVariant,
    ...restProps
  } = props;

  return (
    <button
      role='button'
      ref={ref}
      className={clsx(
        'x-btn',
        'x-btn--' + variant,
        'x-btn--' + colorVariant,
        className,
      )}
      {...restProps}>
      {loading && spinnerPlacement === 'start' && <Loading />}
      {loading
        ? loadingText || <span style={{opacity: 0}}>{children}</span>
        : children}
      {loading && spinnerPlacement === 'end' && <Loading />}
    </button>
  );
});

Button.defaultProps = {
  type: 'button',
  variant: 'normal',
  colorVariant: 'primary',
  spinnerPlacement: 'start',
};

Button.displayName = 'Button';

export {Button};
