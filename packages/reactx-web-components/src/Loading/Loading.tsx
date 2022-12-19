/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *g
 */

import clsx from 'clsx';
import React from 'react';

export interface LoadingPropsType
  extends React.HTMLAttributes<HTMLDivElement> {}

const Loading: React.FC<LoadingPropsType> = (props) => {
  const {className, ...restProps} = props;

  return <div className={clsx('x-loading', className)} {...restProps}></div>;
};

export {Loading};
