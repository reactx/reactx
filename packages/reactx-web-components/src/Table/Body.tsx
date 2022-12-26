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
  items: Array<{ name: string, rowspan: number }>
  rows: Array<{ name: string }>
}

const Body: React.FC<TBodyPropsType> = (props) => {
  const {className, children, items, rows, ...restProps} = props;

  return (
    <tbody className={clsx('x-tbody', className)} {...restProps}>
    {rows.map((row) => {
      return (
        <tr key={row.name} className='x-tbody__data'>
          {items.map((item) => {
            return (
              <td className='x-thead__data'
                  rowSpan={item.rowspan}
                  key={item.name}>
                {item.name}
              </td>
            )
          })}
        </tr>
      )
    })}
    </tbody>
  );
};

export default Body


