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
import {type ButtonProps} from 'inline-typed';

const defaultProps = {
  buttonProps: {},
  disabled: false,
  type: 'button',
  title: 'button',
  badgeProps: {
    className: 'badge badge-pill',
  },
  renderBadge(props) {
    return (
      <span
        {...props}
        className={
          props.className +
          (button.badgecolor !== '' ? ' badge-' + button.badgecolor : '')
        }>
        {props.badge}
      </span>
    );
  },
  renderButton(props) {
    const parentProps = {...props};
    delete parentProps.renderBadge;
    delete parentProps.badgeProps;
    cleanProps(parentProps);
    cleanProps(props.badgeProps);

    return (
      <button
        {...parentProps}
        className={
          (props.btncolor ? ' btn-' + props.btncolor : '') +
          (props.className || '')
        }>
        {props.title}
        {props.badgeProps?.badge && props.renderBadge(props.badgeProps)}
      </button>
    );
  },
};

function ButtonComponent(userProps: ButtonProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: ButtonProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderButton({
    ...props.buttonProps,
    id: props.id,
    title: props.title,
    type: props.type,
    disabled: props.disabled,
    badgeProps: props.badgeProps,
    btncolor: props.btncolor,

    ref: props.forwardedRef,
    className: props.className,
    renderBadge: props.renderBadge,
    onClick: props.onClick,
  });
}

const Button = React.forwardRef((props, ref) => (
  <ButtonComponent forwardedRef={ref} {...props}></ButtonComponent>
));
export default Button;
