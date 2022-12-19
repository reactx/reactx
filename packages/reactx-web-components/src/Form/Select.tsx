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

export interface SelectPropsType
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  items: Array<{label: string; value: string}>;
  label?: string;
  error?: string;
  helperText?: string;
}

const Select: React.FC<SelectPropsType> = ({
  className,
  children,
  items = [],
  label,
  error,
  helperText,
  ...restProps
}) => {
  return (
    <div className='x-form-control-container'>
      {label && <label htmlFor={restProps.id}>{label}</label>}
      <select
        className={clsx('x-select', 'x-form-control', className)}
        {...restProps}>
        {items.map((item) => {
          return (
            <option
              className='x-select__option'
              value={item.value}
              key={item.label}>
              {item.label}
            </option>
          );
        })}
      </select>
      {error && <div className='x-form-control-error'>{error}</div>}
      {helperText && (
        <div className='x-form-control-helper-text'>{helperText}</div>
      )}
    </div>
  );
};

export default Select;
