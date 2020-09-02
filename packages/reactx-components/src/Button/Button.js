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

export type ButtonProps = {
  id?: string,
  title?: string,
  type?: string,
  btncolor?: string,
  disabled: boolean,
  badgeProps: {
    badge: string,
    className: string,
    badgecolor: string,
  },

  buttonProps: any,
  className?: string,
  forwardedRef: {current: any},
  renderButton?: (props: any) => void,
  renderBadge?: (props: any) => void,
  onClick: (e: MouseEventHandler<T>) => void,
};

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
        className={
          props.className +
          (props.badgecolor !== '' ? ' badge-' + props.badgecolor : '')
        }>
        {props.badge}
      </span>
    );
  },
  renderButton(props) {
    const parentProps = {...props};
    delete parentProps.renderBadge;
    delete parentProps.badgeProps;
    delete parentProps.btncolor;
    cleanProps(parentProps);
    cleanProps(props.badgeProps);

    return (
      <button
        {...parentProps}
        className={
          (props.className || '') +
          (props.btncolor ? ' btn-' + (props.btncolor + ' ') : '')
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
    badgeProps: {...defaultProps.badgeProps, ...userProps.badgeProps},
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
