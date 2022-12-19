/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React from 'react';

export interface ControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Control: React.FC<ControlProps> = ({
  className,
  label,
  error,
  helperText,
  ...restProps
}) => {
  return (
    <div className='x-form-control-container'>
      {label && <label htmlFor={restProps.id}>{label}</label>}
      <input className={clsx('x-form-control', className)} {...restProps} />
      {error && <div className='x-form-control-error'>{error}</div>}
      {helperText && (
        <div className='x-form-control-helper-text'>{helperText}</div>
      )}
    </div>
  );
};

export default Control;
