/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *g
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import '../assets/elements.loading.scss';

export interface LoadingPropsType
  extends React.HTMLAttributes<HTMLDivElement> {}

const Loading = forwardRef<HTMLDivElement, LoadingPropsType>((props, ref) => {
  const {className, ...restProps} = props;

  return (
    <div ref={ref} className={clsx('x-loading', className)} {...restProps}>
    </div>
  );
});
Loading.displayName = 'Loading';
export {Loading};
