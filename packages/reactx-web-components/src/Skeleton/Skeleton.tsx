/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React from 'react';

interface SkeletonPropsType extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}
const Skeleton: React.FC<SkeletonPropsType> = ({
  className,
  children,
  lines = 1,
  ...restProps
}) => {
  return (
    <div className={clsx('x-skeleton', className)} {...restProps}>
      {Array.from({length: lines}).map((_, index) => (
        <div key={index} className='x-skeleton--line' />
      ))}
    </div>
  );
};
export {Skeleton};
