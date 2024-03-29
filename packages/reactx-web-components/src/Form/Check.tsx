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

export type FormCheckType = 'checkbox' | 'radio';

export interface CheckPropsType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  inline?: boolean;
  label?: React.ReactNode;
  type?: FormCheckType;
  isInvalid?: boolean;
  isValid?: boolean;
}

const Check: React.FC<CheckPropsType> = (props) => {
  const {
    className,
    inline,
    label,
    isInvalid,
    isValid,
    id,
    type = 'checkbox',
    ...restProps
  } = props;

  const hasLabel = label != null && label !== false;

  return (
    <div
      className={clsx(
        'x-check',
        'x-form--control',
        className,
        {'x-check--inline': inline},
        {'x-is-valid': isValid},
        {'x-is-invalid': isInvalid},
      )}>
      <input
        className='x-check__input'
        id={id}
        type={type}
        {...restProps}></input>
      {hasLabel && (
        <label className='x-check__label' htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
export default Check;
