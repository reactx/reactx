/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef} from 'react';

export type FormSelectType = 'checkbox' | 'radio';

export interface SelectPropsType
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  forawardedRef?: ForwardedRef<HTMLSelectElement>;
  isInvalid?: boolean;
  isValid?: boolean;
}

const SelectComponent = (props: SelectPropsType) => {
  const {forawardedRef, className, isInvalid, isValid, children, ...restProps} =
    props;

  return (
    <select
      ref={forawardedRef}
      className={classNames(
        'x-select',
        className,
        {'x-is-valid': isValid},
        {'x-is-invalid': isInvalid},
      )}
      {...restProps}>
      {children}
    </select>
  );
};

const Select = React.forwardRef<HTMLSelectElement, SelectPropsType>(
  (props, ref) => <SelectComponent {...props} forawardedRef={ref} />,
);

Select.displayName = 'Select';
export default Select;
