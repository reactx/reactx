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

export interface BreadCrumbItemPropsType
  extends React.LiHTMLAttributes<HTMLLIElement> {
  forawardedRef?: ForwardedRef<HTMLLIElement>;
  active?: boolean;
}

const BreadCrumbItemComponent = (props: BreadCrumbItemPropsType) => {
  const {forawardedRef, className, active, children, title, ...restProps} =
    props;

  return (
    <li
      ref={forawardedRef}
      className={classNames('x-breadcrumb-item', className, {
        'x-active': active,
      })}
      {...restProps}>
      {children}
    </li>
  );
};

const BreadCrumbItem = forwardRef<HTMLLIElement, BreadCrumbItemPropsType>(
  (props, ref) => {
    return <BreadCrumbItemComponent {...props} forawardedRef={ref} />;
  },
);

BreadCrumbItem.displayName = 'BreadCrumbItem';
export default BreadCrumbItem;
