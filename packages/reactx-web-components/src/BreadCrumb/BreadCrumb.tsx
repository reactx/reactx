/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {Children, cloneElement, forwardRef, isValidElement} from 'react';
import {__DEV__} from '../../../reactx-base';
import BreadCrumbItem from './BreadCrumbItem';

export interface BreadCrumbPropsType
  extends React.OlHTMLAttributes<HTMLMenuElement> {
  label?: string;
  separator?: string;
  listProps?: React.OlHTMLAttributes<HTMLOListElement>;
}

const BreadCrumb = forwardRef<HTMLMenuElement, BreadCrumbPropsType>(
  (props, ref) => {
    const {className, label, separator, listProps, children, ...restProps} =
      props;

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
      <nav
        ref={ref}
        aria-label={label}
        className={clsx('x-breadcrumb', className)}
        {...restProps}>
        <ol
          {...listProps}
          className={clsx('x-breadcrumb__list', listProps?.className)}>
          {clones}
        </ol>
      </nav>
    );
  },
);

BreadCrumb.defaultProps = {
  label: 'breadcrumb',
  separator: '/',
  listProps: {},
};

if (__DEV__) {
  BreadCrumb.displayName = 'BreadCrumb';
}

export default Object.assign(BreadCrumb, {
  Item: BreadCrumbItem,
});
