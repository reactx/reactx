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

type InputDateProps = {
  id?: string,
  name?: string,
  value?: string,
  type?: string,
  title?: string,
  disabled?: boolean,
  required?: boolean,
  readOnly?: boolean,
  minLength?: number,
  maxLength?: number,

  inputDateProps: any,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderInputDate?: (props: any) => void,
  renderTitle?: (props: any) => void,
};

const defaultProps = {
  inputDateProps: {},
  value: '',
  type: 'date',
  onChange: (e) => {},
  renderTitle(props) {
    return <label>{props.title}</label>;
  },
  renderInputDate(props) {
    const parentProps = {...props};
    delete parentProps.renderTitle;
    cleanProps(parentProps);
    return (
      <>
        {props.title && props.title !== '' && props.renderTitle(parentProps)}
        <input
          {...parentProps}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
        />
      </>
    );
  },
};

function InputDateComponent(userProps: InputDateProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: InputDateProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderInputDate({
    ...props.inputDateProps,
    id: props.id,
    name: props.name,
    value: props.value,
    type: props.type,
    title: props.title,
    disabled: props.disabled,
    required: props.required,
    readOnly: props.readOnly,
    minLength: props.minLength,
    maxLength: props.maxLength,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
    renderTitle: props.renderTitle,
  });
}

const InputDate = React.forwardRef((props, ref) => (
  <InputDateComponent forwardedRef={ref} {...props}></InputDateComponent>
));
export default InputDate;
