/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, useCallback} from 'react';
import {CloseButton} from '../CloseButton/CloseButton';
import {Variant} from '../types';

export interface AlertPropsType extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  dismissible?: boolean;
  show: boolean;
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  onClose?: (a: any, b: any) => void;
}

const AlertComponent = (props: AlertPropsType) => {
  const {
    forawardedRef,
    show,
    className,
    children,
    variant,
    onClose,
    dismissible,
    ...restProps
  } = props;

  const handleClose = useCallback((e) => {
    if (onClose) {
      onClose(false, e);
    }
  }, []);

  return (
    <div
      role="alert"
      ref={forawardedRef}
      className={classNames('x-alert', 'x-alert-' + variant, className)}
      {...restProps}>
      {dismissible && <CloseButton onClick={handleClose} />}
      {children}
    </div>
  );
};

const Alert = React.forwardRef<HTMLDivElement, AlertPropsType>((props, ref) => (
  <AlertComponent {...props} forawardedRef={ref} />
));
Alert.defaultProps = {
  variant: 'success',
};

Alert.displayName = 'Alert';
export {Alert};
