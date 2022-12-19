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

export interface SwitchPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

const Switch: React.FC<SwitchPropsType> = ({
  className,
  label,
  id,
  ...restProps
}) => {
  return (
    <div className={clsx('x-switch', className)}>
      <label>
        <input
          className='x-switch__input'
          id={id}
          type='checkbox'
          {...restProps}></input>
        <span className='x-switch__slider' />
      </label>
      {label !== null && label !== false && (
        <label className='x-switch__label' htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
export default Switch;
