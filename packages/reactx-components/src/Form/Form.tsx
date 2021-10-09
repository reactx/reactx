/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, useCallback} from 'react';
import '../assets/elements.form.scss';
import Check from './Check';
import Control from './Control';
import DateTime from './DateTime';
import Select from './Select';
import Switch from './Switch';
import TextArea from './TextArea';

export interface FormPropsType
  extends React.FormHTMLAttributes<HTMLFormElement> {
  forawardedRef?: ForwardedRef<HTMLFormElement>;
  validated?: boolean;
  preventDfaultAction?: boolean;
}

const FormComponent = (props: FormPropsType) => {
  const {
    forawardedRef,
    className,
    validated,
    preventDfaultAction,
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
      ref={forawardedRef}
      onSubmit={handleSubmit}
      className={classNames('x-form', className, {
        'x-form--validate': validated,
      })}
      {...restProps}></form>
  );
};

const Form = React.forwardRef<HTMLFormElement, FormPropsType>((props, ref) => (
  <FormComponent {...props} forawardedRef={ref} />
));

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
});
