/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type RadioProps = {
  id?: string,
  title?: string,
  name?: string,
  checked?: boolean,
  required?: boolean,
  disabled?: boolean,

  radioProps: any,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderRadio?: (props: any) => void,
};

const defaultProps = {
  radioProps: {},
  renderRadio(props) {
    return <input {...props} type="radio" />;
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
    required: props.required,
    disabled: props.disabled,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
  });
}

const Radio = React.forwardRef((props, ref) => (
  <RadioComponent forwardedRef={ref} {...props}></RadioComponent>
));
export default Radio;
