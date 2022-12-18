/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React from 'react';

export interface BreadCrumbItemPropsType
  extends React.LiHTMLAttributes<HTMLLIElement> {
  separator: string;
  active?: boolean;
  isLastChild?: boolean;
}

const BreadCrumbItem: React.FC<BreadCrumbItemPropsType> = ({
  className,
  isLastChild,
  separator,
  active,
  children,
  title,
  ...restProps
}) => {
  return (
    <li
      className={clsx('x-breadcrumb__item', className, {
        'x-active': active,
      })}
      {...restProps}>
      <>
        {children}
        {!isLastChild && {separator}}
      </>
    </li>
  );
};
export default BreadCrumbItem;
