/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type FormProps = {
  onSubmit: (e: FormEventHandler<T>) => void,
  renderForm?: (props: any) => void,
  name?: string,
  className?: string,
  id?: string,
  formProps: any,
  forwardedRef: {current: any},
};

const defaultProps = {
  formProps: {},
  renderForm(props) {
    return <form {...props}>{props.children}</form>;
  },
  onChange() {},
};

function FormComponent(userProps: FormProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: FormProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  const handleSubmit = useCallback((event) => {
    if (props.onSubmit) props.onSubmit(event);
  }, []);

  const composeEventHandlers = useCallback(
    (
      internal: (e: KeyboardEvent) => void,
      external: (e: KeyboardEvent) => void,
    ) => {
      return external
        ? (e: KeyboardEvent) => {
            internal(e);
            external(e);
          }
        : internal;
    },
    [],
  );
  return props.renderForm({
    ...props.formProps,
    onSubmit: composeEventHandlers(handleSubmit, props.onSubmit),
    id: props.id,
    name: props.name,
    className: props.className,
    ref: props.forwardedRef,
    children: props.children,
  });
}

const Form = React.forwardRef((props, ref) => (
  <FormComponent forwardedRef={ref} {...props}></FormComponent>
));
export default Form;
