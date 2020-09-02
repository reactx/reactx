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

type InputTextProps = {
  id?: string,
  name?: string,
  type?: string,
  title?: string,
  placeholder?: string,
  value?: string,
  required?: boolean,
  autoFocus?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  pattern?: string,
  minLength?: number,
  maxLength?: number,

  inputTextProps: any,
  forwardedRef: {current: any},
  className?: string,
  onChange: (e: ChangeEventHandler<T>) => void,
  renderInputText?: (props: any) => void,
  renderTitle?: (props: any) => void,
};

const defaultProps = {
  inputTextProps: {},
  value: '',
  type: 'text',
  onChange: (e) => {},
  renderTitle(props) {
    return <label>{props.title}</label>;
  },
  renderInputText(props) {
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

function InputTextComponent(userProps: InputTextProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: InputTextProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderInputText({
    ...props.inputTextProps,
    id: props.id,
    name: props.name,
    type: props.type,
    title: props.title,
    placeholder: props.placeholder,
    value: props.value,
    required: props.required,
    autoFocus: props.autoFocus,
    readOnly: props.readOnly,
    disabled: props.disabled,
    pattern: props.pattern,
    minLength: props.minLength,
    maxLength: props.maxLength,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
    renderTitle: props.renderTitle,
  });
}

const InputText = React.forwardRef((props, ref) => (
  <InputTextComponent forwardedRef={ref} {...props}></InputTextComponent>
));
export default InputText;
