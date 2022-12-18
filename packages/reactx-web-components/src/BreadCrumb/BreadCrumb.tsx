/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {Children, cloneElement, isValidElement} from 'react';
import BreadCrumbItem from './BreadCrumbItem';

export interface BreadCrumbPropsType
  extends React.OlHTMLAttributes<HTMLMenuElement> {
  separator?: string;
  listProps?: React.OlHTMLAttributes<HTMLOListElement>;
}

const BreadCrumb: React.FC<BreadCrumbPropsType> = ({
  className,
  separator = '/',
  listProps = {},
  children,
  ...restProps
}) => {
  const validChildren = Children.toArray(children).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[];

  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      separator,
      isLastChild: validChildren.length === index + 1,
    }),
  );

  return (
    <nav className={clsx('x-breadcrumb', className)} {...restProps}>
      <ol
        {...listProps}
        className={clsx('x-breadcrumb__list', listProps?.className)}>
        {clones}
      </ol>
    </nav>
  );
};

export default Object.assign(BreadCrumb, {
  Item: BreadCrumbItem,
});
