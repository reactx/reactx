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
import {__DEV__} from '../../../reactx-base';

export interface BreadCrumbItemPropsType
  extends React.LiHTMLAttributes<HTMLLIElement> {
  separator: string;
  active?: boolean;
  isLastChild?: boolean;
}

const BreadCrumbItem = forwardRef<HTMLLIElement, BreadCrumbItemPropsType>(
  (props, ref) => {
    const {
      className,
      isLastChild,
      separator,
      active,
      children,
      title,
      ...restProps
    } = props;

    return (
      <li
        ref={ref}
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
  },
);

if (__DEV__) {
  BreadCrumbItem.displayName = 'BreadCrumbItem';
}

export default BreadCrumbItem;
