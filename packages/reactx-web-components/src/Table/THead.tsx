/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
import React from "react";
import clsx from "clsx";

export interface THeadPropsType extends React.TableHTMLAttributes<HTMLTableHeaderCellElement> {
}

const THead: React.FC<THeadPropsType> = (props) => {
  const {children, className, align, ...restProps} = props
  return (
    <thead align={align} className={clsx('x-thead', className)} {...restProps}>
    {children}
    </thead>
  )
}

export default THead;
