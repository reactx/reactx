/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import clsx from "clsx";
import Head from './Head';
import Body from './Body';
import Foot from './Foot';

export interface TablePropsType
  extends React.TableHTMLAttributes<HTMLTableElement> {
}

const Table: React.FC<TablePropsType> = (props) => {
  const {className, children, ...restProps} = props;
  return (
    <table className={clsx('x-table', className)}{...restProps}>
      {children}
    </table>
  );
};

export default Object.assign(Table, {

  Head,
  Body,
  Foot,
});
