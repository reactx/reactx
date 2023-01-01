/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import clsx from 'clsx';

export interface TFootPropsType
  extends React.TableHTMLAttributes<HTMLTableCaptionElement> {}

const Foot: React.FC<TFootPropsType> = (props) => {
  const {children, className, ...restProps} = props;
  return (
    <tfoot className={clsx('x-tfoot', className)} {...restProps}>
      {children}
    </tfoot>
  );
};

export default Foot;
