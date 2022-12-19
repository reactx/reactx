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
import Check from './Check';
import Control from './Control';
import Select from './Select';
import Switch from './Switch';
import TextArea from './TextArea';

export interface FormPropsType
  extends React.FormHTMLAttributes<HTMLFormElement> {
  validated?: boolean;
}

const Form: React.FC<FormPropsType> = (props) => {
  const {className, validated = true, children, onSubmit, ...restProps} = props;

  return (
    <form
      onSubmit={onSubmit}
      className={clsx('x-form', className, {
        'x-form--validate': validated,
      })}
      {...restProps}>
      {children}
    </form>
  );
};

export default Object.assign(Form, {
  Control,
  Check,
  Switch,
  Select,
  TextArea,
});
