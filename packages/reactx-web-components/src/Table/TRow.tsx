/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React from 'react';

export interface TRowProps
  extends React.TableHTMLAttributes<HTMLTableRowElement> {

}

const TRow: React.FC<TRowProps> = (props) => {
  const {children, className, ...restProps} = props

  return (
    <tr className={clsx('x-tr', className)}
        {...restProps}
    >
      {children}
    </tr>
  )
}

export default TRow

