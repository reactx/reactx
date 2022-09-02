/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
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

const Alert = React.forwardRef<HTMLDivElement, AlertPropsType>((props, ref) => {
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

  const handleClose: any = useCallback(
    (e: React.MouseEventHandler<HTMLButtonElement> | undefined) => {
      if (onClose) {
        onClose(false, e);
      }
    },
    [],
  );

  return (
    <div
      role='alert'
      ref={forawardedRef}
      className={clsx('x-alert', 'x-alert-' + variant, className)}
      {...restProps}>
      {dismissible && <CloseButton onClick={handleClose} />}
      {children}
    </div>
  );
});

Alert.defaultProps = {
  variant: 'success',
};

Alert.displayName = 'Alert';
export {Alert};
