/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {ForwardedRef} from 'react';
import '../assets/elements.form-check.scss';

export type FormCheckType = 'checkbox' | 'radio';

export interface CheckPropsType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  forawardedRef?: ForwardedRef<HTMLInputElement>;
  inline?: boolean;
  label?: React.ReactNode;
  type?: FormCheckType;
  isInvalid?: boolean;
  isValid?: boolean;
}

const CheckComponent = (props: CheckPropsType) => {
  const {
    forawardedRef,
    className,
    type,
    inline,
    label,
    isInvalid,
    isValid,
    id,
    ...restProps
  } = props;

  const hasLabel = label != null && label !== false;

  return (
    <div
      className={clsx(
        'x-check',
        className,
        {'x-check--inline': inline},
        {'x-is-valid': isValid},
        {'x-is-invalid': isInvalid},
      )}>
      <input
        className='x-check__input'
        id={id}
        type={type}
        ref={forawardedRef}
        {...restProps}></input>
      {hasLabel && (
        <label className='x-check__label' htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

const Check = React.forwardRef<HTMLInputElement, CheckPropsType>(
  (props, ref) => <CheckComponent {...props} forawardedRef={ref} />,
);

Check.displayName = 'Check';
Check.defaultProps = {
  type: 'checkbox',
};
export default Check;
