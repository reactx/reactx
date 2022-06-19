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

export interface SwitchPropsType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  forawardedRef?: ForwardedRef<HTMLInputElement>;
  label?: React.ReactNode;
  isInvalid?: boolean;
  isValid?: boolean;
}

const SwitchComponent = (props: SwitchPropsType) => {
  const {
    forawardedRef,
    className,
    label,
    isInvalid,
    isValid,
    children,
    id,
    ...restProps
  } = props;

  const hasLabel = label != null && label !== false;

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
          ref={forawardedRef}
          {...restProps}></input>
        <span className='x-switch__slider' />
      </label>
      {hasLabel && (
        <label className='x-switch__label' htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

const Switch = React.forwardRef<HTMLInputElement, SwitchPropsType>(
  (props, ref) => <SwitchComponent {...props} forawardedRef={ref} />,
);

Switch.displayName = 'Switch';
export default Switch;
