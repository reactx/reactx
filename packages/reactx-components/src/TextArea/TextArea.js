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

type TextAreaProps = {
  id?: string,
  name?: string,
  title?: string,
  placeholder?: string,
  value?: string,
  required?: string,
  autoFocus?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  editor?: boolean,
  minLength?: boolean,
  maxLength?: boolean,
  rows?: boolean,
  cols?: boolean,
  wrap?: boolean,
  wordCount?: boolean,
  wordCountText?: string,

  forwardedRef: {current: any},
  className?: string,
  textAreaProps: any,
  onChange: (e: ChangeEventHandler<T>) => void,
  renderTextArea?: (props: any) => void,
  renderTitle?: (props: any) => void,
};

const defaultProps = {
  textAreaProps: {},
  value: '',
  wordCountText: 'Word Count:',
  onChange: (e) => {},
  renderTitle(props) {
    return <label>{props.title}</label>;
  },
  renderTextArea(props) {
    const parentProps = {...props};
    delete parentProps.renderTitle;
    delete parentProps.wordCount;
    cleanProps(parentProps);
    return (
      <>
        {props.title && props.title !== '' && props.renderTitle(parentProps)}
        <textarea
          {...parentProps}
          autoFocus={props.autoFocus}
          onChange={props.onChange}></textarea>
        {props.wordCount && !props.readOnly && !props.disabled && (
          <small
            visibility={props.visibility}
            className="nirvana-text-area-wordcount">
            {props.wordCountText} {props.value.length}
          </small>
        )}
      </>
    );
  },
};

function TextAreaComponent(userProps: TextAreaProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: TextAreaProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderTextArea({
    ...props.textAreaProps,
    id: props.id,
    name: props.name,
    title: props.title,
    placeholder: props.placeholder,
    value: props.value,
    required: props.required,
    autoFocus: props.autoFocus,
    readOnly: props.readOnly,
    disabled: props.disabled,
    editor: props.editor,
    minLength: props.minLength,
    maxLength: props.maxLength,
    rows: props.rows,
    cols: props.cols,
    wrap: props.wrap,
    wordCount: props.wordCount,
    wordCountText: props.wordCountText,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
    renderTitle: props.renderTitle,
  });
}

const TextArea = React.forwardRef((props, ref) => (
  <TextAreaComponent forwardedRef={ref} {...props}></TextAreaComponent>
));
export default TextArea;
