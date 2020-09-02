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

export type CheckBoxProps = {
  id?: string,
  title?: string,
  name?: string,
  checked?: boolean,
  inline?: boolean,
  value?: string,
  legend?: string,
  required?: boolean,
  disabled?: boolean,

  checkBoxProps?: any,
  wrapperClassName: string,
  requiredClassName: string,
  legendClassName: string,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderCheckBox?: (props: any) => void,
  renderTitle?: (props: any) => void,
  renderLegend?: (props: any) => void,
};

const defaultProps = {
  checkBoxProps: {},
  disabled: false,
  required: false,
  wrapperClassName: 'form-group',
  legendClassName: 'legend',
  renderTitle(props) {
    return (
      <label>
        {props.title}
        {props.required && <span className={props.requiredClassName}>*</span>}
      </label>
    );
  },
  renderLegend(props) {
    return (
      <legend className={props.legendClassName}>
        {props.legend}
        {props.required && <span className={props.requiredClassName}>*</span>}
      </legend>
    );
  },
  renderCheckBox(props) {
    const parentProps = {...props};
    delete parentProps.renderTitle;
    delete parentProps.renderLegend;
    delete parentProps.wrapperClassName;
    delete parentProps.requiredClassName;
    delete parentProps.legend;
    cleanProps(parentProps);

    return (
      <div className={props.wrapperClassName}>
        {props.title &&
          props.title !== '' &&
          !props.inline &&
          props.renderTitle(parentProps)}
        <fieldset>
          {props.legend &&
            props.legend !== '' &&
            props.renderLegend(parentProps)}
          <input {...parentProps} type="checkbox" onChange={props.onChange} />
          {props.title &&
            props.title !== '' &&
            props.inline &&
            props.renderTitle(parentProps)}
        </fieldset>
      </div>
    );
  },
};

function CheckBoxComponent(userProps: CheckBoxProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: CheckBoxProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderCheckBox({
    ...props.checkBoxProps,
    id: props.id,
    title: props.title,
    name: props.name,
    checked: props.checked,
    inline: props.inline,
    value: props.value,
    legend: props.legend,
    required: props.required,
    disabled: props.disabled,

    ref: props.forwardedRef,
    className: props.className,
    wrapperClassName: props.wrapperClassName,
    requiredClassName: props.requiredClassName,
    legendClassName: props.requiredClassName,
    onChange: props.onChange,
    renderTitle: props.renderTitle,
    renderLegend: props.renderLegend,
  });
}

const CheckBox = React.forwardRef((props, ref) => (
  <CheckBoxComponent forwardedRef={ref} {...props}></CheckBoxComponent>
));
export default CheckBox;
