/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';
import {cleanProps} from '../../utils';

type FormProps = {
  name?: string,
  className?: string,
  id?: string,
  formProps: any,
  forwardedRef: {current: any},
  renderForm?: (props: any) => void,
  onSubmit: (e: FormEventHandler<T>) => void,
  onReset: (e: FormEventHandler<T>) => void,
};

const defaultProps = {
  formProps: {},
  renderForm(props) {
    const parentProps = {...props};
    cleanProps(parentProps);

    return <form {...parentProps}>{props.children}</form>;
  },
};

function FormComponent(userProps: FormProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: FormProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderForm({
    ...props.formProps,
    id: props.id,
    name: props.name,
    action: props.action,
    method: props.method,
    className: props.className,
    ref: props.forwardedRef,
    children: props.children,
    onSubmit: props.onSubmit,
    onReset: props.onReset,
  });
}

const Form = React.forwardRef((props, ref) => (
  <FormComponent forwardedRef={ref} {...props}></FormComponent>
));
export default Form;
