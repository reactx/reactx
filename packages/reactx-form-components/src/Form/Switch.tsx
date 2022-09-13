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

export interface SwitchPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  isInvalid?: boolean;
  isValid?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchPropsType>((props, ref) => {
  const {className, label, isInvalid, isValid, id, ...restProps} = props;

  return (
    <div
      className={clsx(
        'x-switch',
        className,
        {'x-is-valid': isValid},
        {'x-is-invalid': isInvalid},
      )}>
      <label>
        <input
          className='x-switch__input'
          id={id}
          type='checkbox'
          ref={ref}
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
});

Switch.displayName = 'Switch';
export default Switch;
