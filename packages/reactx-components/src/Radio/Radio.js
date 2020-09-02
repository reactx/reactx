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

type RadioProps = {
  id?: string,
  title?: string,
  name?: string,
  checked?: boolean,
  inline?: boolean,
  value?: string,
  legend?: string,
  required?: boolean,
  disabled?: boolean,

  radioProps: any,
  wrapperClassName: string,
  requiredClassName: string,
  legendClassName: string,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderRadio?: (props: any) => void,
  renderTitle?: (props: any) => void,
  renderLegend?: (props: any) => void,
};

const defaultProps = {
  radioProps: {},
  inline: false,
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
  renderRadio(props) {
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
          <input {...parentProps} type="radio" onChange={props.onChange} />
          {props.title &&
            props.title !== '' &&
            props.inline &&
            props.renderTitle(parentProps)}
        </fieldset>
      </div>
    );
  },
};

function RadioComponent(userProps: RadioProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: RadioProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderRadio({
    ...props.radioProps,
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

const Radio = React.forwardRef((props, ref) => (
  <RadioComponent forwardedRef={ref} {...props}></RadioComponent>
));
export default Radio;
