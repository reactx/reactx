/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useCallback} from 'react';
import {Loading} from '../Loading/Loading';
import {ButtonVariant, SpinnerPlacement, Colors} from '../types';

export interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: Colors;
  loadingText?: string;
  spinnerPlacement?: SpinnerPlacement;
  loading?: boolean | React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonPropsType>((props, ref) => {
  const {
    loading,
    className,
    children,
    loadingText,
    type = 'button',
    variant = 'normal',
    color,
    spinnerPlacement = 'start',
    onClick,
    ...restProps
  } = props;

  const OnClickHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (loading) return;

      if (onClick) onClick(event);
    },
    [loading, onClick],
  );

  return (
    <button
      role='button'
      ref={ref}
      className={clsx(
        'x-btn',
        'x-btn--' + variant,
        color ? 'x-btn--' + color : '',
        className,
      )}
      onClick={OnClickHandler}
      type={type}
      {...restProps}>
      {loading && spinnerPlacement === 'start' && <Loading />}
      {loading
        ? loadingText || <span style={{opacity: 0}}>{children}</span>
        : children}
      {loading && spinnerPlacement === 'end' && <Loading />}
    </button>
  );
});

export {Button};
