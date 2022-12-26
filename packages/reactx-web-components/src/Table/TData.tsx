/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
import clsx from "clsx";
import React from "react";

export interface TDataPropsType
  extends React.TableHTMLAttributes<HTMLTableDataCellElement> {

}

const TData: React.FC<TDataPropsType> = (props) => {
  const {className, children, ...restProps} = props;
  return (
    <td className={clsx('x-td', className)}
        {...restProps}>
      {children}
    </td>
  )
}

export default TData;

