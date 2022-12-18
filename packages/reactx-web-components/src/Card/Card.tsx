/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React from 'react';

interface CardPropsType extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode | string;
  footer?: React.ReactNode | string;
}
export const Card: React.FC<CardPropsType> = ({
  className,
  children,
  header,
  footer,
  ...restProps
}) => {
  return (
    <div className={clsx('x-card', className)} {...restProps}>
      {header && <div className='x-card__header'>{header}</div>}
      <div className='x-card__body'>{children}</div>
      {footer && <div className='x-card__footer'>{footer}</div>}
    </div>
  );
};
