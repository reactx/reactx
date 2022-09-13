/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';

export interface CloseButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonPropsType>(
  (props, ref) => {
    const {className, ...restProps} = props;
    return (
      <button
        ref={ref}
        type='button'
        aria-label='Close'
        className={clsx('x-btn--close', className)}
        {...restProps}>
        &times;
      </button>
    );
  },
);

CloseButton.displayName = 'CloseButton';
export {CloseButton};