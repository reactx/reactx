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

export interface SelectPropsType
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isInvalid?: boolean;
  isValid?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectPropsType>((props, ref) => {
  const {className, isInvalid, isValid, children, ...restProps} = props;

  return (
    <select
      ref={ref}
      className={clsx(
        'x-select',
        'x-form-control',
        className,
        {'x-is-valid': isValid},
        {'x-is-invalid': isInvalid},
      )}
      {...restProps}>
      {children}
    </select>
  );
});

Select.displayName = 'Select';
export default Select;
