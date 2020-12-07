/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useMemo, useRef, useCallback, useState, useEffect} from 'react';
import type {Element} from 'react';
type InputProps = {
  onChange: (e: SyntheticEvent<HTMLButtonElement>, value: string) => void,
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
  onFocus: (e: SyntheticEvent<HTMLButtonElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLButtonElement>) => void,
  onKeyDown: (e: SyntheticEvent<HTMLButtonElement>) => void,
  renderInput?: (props: any) => void,
  value: any,
  defaultValue: any,
  label?: string,
  title?: string,
  type?: string,
  id?: string,
  inputProps: any,
  className: string,
  placeholder: string,
  checked: boolean,
  min: number,
  max: number,
  forwardedRef: {current: any},
};

const defaultProps = {
  value: '',
  type: 'text',
  inputProps: {},
  renderInput(props) {
    return (
      <>
        {props.label && <label>{props.label} </label>}
        <input {...props} />
      </>
    );
  },
  onChange(e: SyntheticEvent<HTMLButtonElement>) {},
  onClick(e: SyntheticEvent<HTMLButtonElement>) {},
};

function InputComponent(userProps: InputProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);
  const [options, setOptions] = useState({
    _ignoreBlur: false,
    _ignoreFocus: false,
  });

  const props: InputProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  const keyDownHandlers = useMemo(() => {
    return {
      Enter(event) {
        // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
        if (event.keyCode !== 13) return;
        // In case the user is currently hovering over the menu
        setOptions({...options, _ignoreBlur: false});
      },
      Escape() {
        // In case the user is currently hovering over the menu
        setOptions({...options, _ignoreBlur: false});
      },
      Tab() {
        // In case the user is currently hovering over the menu
        setOptions({...options, _ignoreBlur: false});
      },
    };
  }, [options]);

  const handleInputFocus = useCallback(
    (event) => {
      if (options._ignoreFocus) {
        setOptions({...options, _ignoreFocus: false, _scrollOffset: null});
        return;
      }
      const {onFocus} = props;
      if (onFocus) {
        onFocus(event);
      }
    },
    [options],
  );

  const handleInputBlur = useCallback(
    (event) => {
      if (options._ignoreBlur) {
        setOptions({
          ...options,
          _ignoreFocus: true,
        });
        props.forwardedRef.current && props.forwardedRef.current.focus();
        return;
      }
      const {onBlur} = props;
      if (onBlur) {
        onBlur(event);
      }
    },
    [options],
  );

  const isInputFocused = useCallback(() => {
    const el = props.forwardedRef.current;
    if (!el) return;
    return el.ownerDocument && el === el.ownerDocument.activeElement;
  }, [props.forwardedRef]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (keyDownHandlers[event.key])
      keyDownHandlers[event.key].call(this, event);
  }, []);

  const composeEventHandlers = useCallback(
    (
      internal: (e: KeyboardEvent) => void,
      external: (e: KeyboardEvent) => void,
    ) => {
      return external
        ? (e: KeyboardEvent) => {
            internal(e);
            external(e);
          }
        : internal;
    },
    [],
  );

  return props.renderInput({
    ...props.inputProps,
    type: props.type,
    ref: props.forwardedRef,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onChange: props.onChange,
    onKeyDown: composeEventHandlers(handleKeyDown, props.onKeyDown),
    onClick: props.onClick,
    value: props.value,
    defaultValue: props.defaultValue,
    id: props.id,
    className: props.className,
    label: props.label,
    title: props.title,
    placeholder: props.placeholder,
    min: props.min,
    max: props.max,
    checked: props.checked,
  });
}

const Input = React.forwardRef((props, ref) => (
  <InputComponent forwardedRef={ref} {...props}></InputComponent>
));
export default Input;
