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

const BreadCrumbItem: FC<BreadCrumbItemPropsType> = forwardRef<
  HTMLLIElement,
  BreadCrumbItemPropsType
>((props, forawardedRef) => {
  return <BreadCrumbItemComponent {...props} forawardedRef={forawardedRef} />;
});

BreadCrumbItem.displayName = 'BreadCrumbItem';
export {BreadCrumbItem};
