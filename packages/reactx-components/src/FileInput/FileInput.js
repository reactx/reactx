/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type FileInputProps = {
  id?: string,
  value?: string,
  name?: string,
  title?: string,
  disabled?: boolean,
  required?: boolean,
  multiple?: boolean,
  minsize?: number,
  maxsize?: number,
  formattype?: string,

  fileInputProps: any,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderFileInput?: (props: any) => void,
};

const defaultProps = {
  fileInputProps: {},
  value: '',
  onChange: (e) => {},
  renderFileInput(props) {
    return <input {...props} type="file" />;
  },
};

function FileInputComponent(userProps: FileInputProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: FileInputProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderFileInput({
    ...props.fileInputProps,
    id: props.id,
    value: props.value,
    name: props.name,
    title: props.title,
    checked: props.checked,
    required: props.required,
    disabled: props.checked,
    autoFocus: props.autoFocus,
    minsize: props.minsize,
    maxsize: props.maxsize,
    formattype: props.formattype,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
  });
}

const FileInput = React.forwardRef((props, ref) => (
  <FileInputComponent forwardedRef={ref} {...props}></FileInputComponent>
));
export default FileInput;
