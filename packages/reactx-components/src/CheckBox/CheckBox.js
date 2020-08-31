/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type CheckBoxProps = {
  id?: string,
  name?: string,
  title?: string,
  checked: boolean,
  disabled?: boolean,
  required?: boolean,

  checkBoxProps?: any,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderCheckBox?: (props: any) => void,
};

const defaultProps = {
  checkBoxProps: {},
  disabled: false,
  required: false,
  renderCheckBox(props) {
    return <input {...props} type="checkbox" />;
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
    name: props.name,
    title: props.title,
    checked: props.checked,
    required: props.required,
    disabled: props.checked,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
  });
}

const CheckBox = React.forwardRef((props, ref) => (
  <CheckBoxComponent forwardedRef={ref} {...props}></CheckBoxComponent>
));
export default CheckBox;
