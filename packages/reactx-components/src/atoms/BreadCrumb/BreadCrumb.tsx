/**
 * Copyright (c) Pascal System and ReactX.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef, forwardRef} from 'react';
import {BreadCrumbItem} from '../BreadCrumbItem/BreadCrumbItem';

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

const BreadCrumbGroup: FC<BreadCrumbPropsType> = forwardRef<
  HTMLMenuElement,
  BreadCrumbPropsType
>((props, forawardedRef) => {
  return <BreadCrumbComponent {...props} forawardedRef={forawardedRef} />;
});

BreadCrumbGroup.displayName = 'BreadCrumb';
BreadCrumbGroup.defaultProps = {
  label: 'breadcrumb',
  listProps: {},
};

const BreadCrumb = Object.assign(BreadCrumbGroup, {
  Item: BreadCrumbItem,
});
export {BreadCrumb};
