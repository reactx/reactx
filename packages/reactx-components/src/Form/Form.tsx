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
import Check from './Check';
import Control from './Control';
import DateTime from './DateTime';
import Select from './Select';
import Switch from './Switch';

export interface FormPropsType
  extends React.FormHTMLAttributes<HTMLFormElement> {
  forawardedRef?: ForwardedRef<HTMLFormElement>;
  validated?: boolean;
}

const FormComponent = (props: FormPropsType) => {
  const {forawardedRef, className, validated, ...restProps} = props;
  return (
    <form
      ref={forawardedRef}
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
};
Form.displayName = 'Form';
export default Object.assign(Form, {
  Control,
  Check,
  Switch,
  Select,
  DatePicker: DateTime,
});
