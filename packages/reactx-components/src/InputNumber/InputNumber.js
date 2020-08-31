/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type InputNumberProps = {
  id?: string,
  title?: string,
  name?: string,
  value?: string,
  type?: string,
  required?: boolean,
  autoFocus?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  minLength?: number,
  maxLength?: number,

  inputNumberProps: any,
  forwardedRef: {current: any},
  className?: string,
  onChange: (e: ChangeEventHandler<T>) => void,
  renderInputNumber?: (props: any) => void,
};

const defaultProps = {
  inputNumberProps: {},
  value: '',
  type: 'number',
  onChange: (e) => {},
  renderInputNumber(props) {
    return <input {...props} />;
  },
};

function InputNumberComponent(userProps: InputNumberProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: InputNumberProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderInputNumber({
    ...props.inputNumberProps,
    id: props.id,
    title: props.title,
    name: props.name,
    value: props.value,
    type: props.type,
    required: props.required,
    autoFocus: props.autoFocus,
    readOnly: props.readOnly,
    disabled: props.disabled,
    minLength: props.minLength,
    maxLength: props.maxLength,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
  });
}

const InputNumber = React.forwardRef((props, ref) => (
  <InputNumberComponent forwardedRef={ref} {...props}></InputNumberComponent>
));
export default InputNumber;
