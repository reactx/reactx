/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useCallback} from 'react';
import {__DEV__} from '../../../reactx-base';
import { CloseButton } from '../ReactComponents';
import {Variant} from '../types';

export interface AlertPropsType extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  dismissible?: boolean;
  onClose?: (b: React.MouseEventHandler<HTMLButtonElement> | undefined) => void;
}

const Alert = forwardRef<HTMLDivElement, AlertPropsType>((props, ref) => {
  const {className, children, variant, onClose, dismissible, ...restProps} =
    props;

  const handleClose: any = useCallback(
    (e: React.MouseEventHandler<HTMLButtonElement> | undefined) => {
      if (onClose) {
        onClose(e);
      }
    },
    [onClose],
  );

  return (
    <div
      role='alert'
      ref={ref}
      className={clsx('x-alert', 'x-alert--' + variant, className)}
      {...restProps}>
      {dismissible && <CloseButton onClick={handleClose} />}
      {children}
    </div>
  );
});

Alert.defaultProps = {
  variant: 'success',
};

if (__DEV__) {
  Alert.displayName = 'Alert';
}
export {Alert};
