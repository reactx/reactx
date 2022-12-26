/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react";
import clsx from "clsx";

export interface TBodyPropsType
  extends React.TableHTMLAttributes<HTMLTableSectionElement> {

}

const TBody: React.FC<TBodyPropsType> = (props) => {
  const {className, children, ...restProps} = props;

  return (
    <tbody className={clsx('x-tbody', className)} {...restProps}>
    {children}
    </tbody>
  );
};

export default TBody


