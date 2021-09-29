/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';
import BreadCrumbItem from './BreadCrumbItem';

export interface BreadCrumbPropsType
  extends React.HTMLAttributes<HTMLMenuElement> {
  forawardedRef?: ForwardedRef<HTMLMenuElement>;
  label?: string;
  listProps?: React.OlHTMLAttributes<HTMLOListElement>;
}

const BreadCrumbComponent = (props: BreadCrumbPropsType) => {
  const {forawardedRef, className, label, listProps, children, ...restProps} =
    props;

  return (
    <nav
      ref={forawardedRef}
      aria-label={label}
      className={classNames('x-breadcrumb', className)}
      {...restProps}>
      <ol
        {...listProps}
        className={classNames('x-breadcrumb-group', listProps?.className)}>
        {children}
      </ol>
    </nav>
  );
};

const BreadCrumb = forwardRef<HTMLMenuElement, BreadCrumbPropsType>(
  (props, ref) => {
    return <BreadCrumbComponent {...props} forawardedRef={ref} />;
  },
);

BreadCrumb.displayName = 'BreadCrumb';
BreadCrumb.defaultProps = {
  label: 'breadcrumb',
  listProps: {},
};

export default Object.assign(BreadCrumb, {
  Item: BreadCrumbItem,
});
