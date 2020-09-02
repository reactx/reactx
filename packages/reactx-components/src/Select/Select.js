/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type SelectProps = {
  id?: string,
  name?: string,
  title?: string,
  value?: string,
  required?: boolean,
  multiple?: boolean,
  readOnly?: boolean,
  items: {name: string, value: string}[],

  selectProps?: any,
  optionProps?: any,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderSelect?: (props: any) => void,
  renderOptions?: (props: any) => void,
  renderTitle?: (props: any) => void,
};

const defaultProps = {
  selectProps: {},
  value: '',
  items: [],
  onChange: (e) => {},
  renderTitle(props) {
    return <label>{props.title}</label>;
  },
  renderOptions(item, props, index) {
    return (
      <option key={index} {...props} value={item.value}>
        {item.name}
      </option>
    );
  },
  renderSelect(props) {
    const parentProps = {...props};
    delete parentProps.renderOptions;
    delete parentProps.renderTitle;
    delete parentProps.optionProps;
    return (
      <>
        {props.title && props.title !== '' && props.renderTitle(parentProps)}
        <select {...parentProps}>
          {props.items.map((item, index) =>
            props.renderOptions(item, props.optionProps, index),
          )}
        </select>
      </>
    );
  },
};

function SelectComponent(userProps: SelectProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: SelectProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderSelect({
    ...props.selectProps,
    id: props.id,
    name: props.name,
    value: props.value,
    title: props.title,
    required: props.required,
    multiple: props.multiple,
    readOnly: props.readOnly,
    items: props.items,

    optionProps: props.optionProps,
    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
    renderOptions: props.renderOptions,
    renderTitle: props.renderTitle,
  });
}

const Select = React.forwardRef((props, ref) => (
  <SelectComponent forwardedRef={ref} {...props}></SelectComponent>
));
export default Select;
