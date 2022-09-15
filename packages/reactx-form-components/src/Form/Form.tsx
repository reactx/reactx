/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useCallback} from 'react';
import '../assets/elements.form.scss';
import Check from './Check';
import Control from './Control';
import DateTime from './DateTime';
import Select from './Select';
import Switch from './Switch';
import TextArea from './TextArea';
import Range from './Range';

export interface FormPropsType
  extends React.FormHTMLAttributes<HTMLFormElement> {
  validated?: boolean;
  preventDfaultAction?: boolean;
}

const Form = forwardRef<HTMLFormElement, FormPropsType>((props, ref) => {
  const {
    className,
    validated,
    preventDfaultAction,
    children,
    onSubmit,
    ...restProps
  } = props;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      // prevent the default form action.
      if (preventDfaultAction) e.preventDefault();
      if (onSubmit) onSubmit(e);
    },
    [preventDfaultAction, onSubmit],
  );
  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={clsx('x-form', className, {
        'x-form--validate': validated,
      })}
      {...restProps}>
      {children}
    </form>
  );
});

Form.defaultProps = {
  validated: true,
  preventDfaultAction: false,
};
Form.displayName = 'Form';
export default Object.assign(Form, {
  Control,
  Check,
  Switch,
  Select,
  TextArea,
  DatePicker: DateTime,
  Range,
});
