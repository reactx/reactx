/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import {__DEV__} from '../../../reactx-base';

export interface CardHeaderPropsType
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderPropsType>(
  (props, ref) => {
    const {className, children, ...restProps} = props;
    return (
      <div ref={ref} className={clsx('x-card__header', className)} {...restProps}>
        {children}
      </div>
    );
  },
);

if (__DEV__) {
  CardHeader.displayName = 'CardHeader';
}

export default CardHeader;
