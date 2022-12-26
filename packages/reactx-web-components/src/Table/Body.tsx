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
  items: Array<{ name: string, value: string }>
}

const Body: React.FC<TBodyPropsType> = (props) => {
  const {className, children, items, ...restProps} = props;

  return (
    <tbody className={clsx('x-tbody', className)} {...restProps}>
    {items.map((item) => {
      return (
        <td key={item.name} className='x-tbody__data'>
          {item.name}
        </td>
      )
    })}
    </tbody>
  );
};

export default Body


