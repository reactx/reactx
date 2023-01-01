/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
import React from 'react';
import clsx from 'clsx';

export interface THeadPropsType
  extends React.TableHTMLAttributes<HTMLTableHeaderCellElement> {
  items: Array<{ name: string; rowspan: number }>;
}

const Head: React.FC<THeadPropsType> = (props) => {
  const {children, className, items} = props;
  return (
    <thead className={clsx('x-thead', className)}>
    <tr>
      {items.map((item) => {
        return (
          <td className='x-thead__data' rowSpan={item.rowspan} key={item.name}>
            {item.name}
          </td>
        );
      })}
    </tr>
    </thead>
  );
};

export default Head;
