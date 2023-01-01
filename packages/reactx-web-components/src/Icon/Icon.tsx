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

export interface IconPropsType extends React.HTMLAttributes<HTMLElement> {
  name: string;
}

export const Icon = (props: IconPropsType) => {
  const {name, className} = props;

  return <i className={clsx('icon-' + name, className)}></i>;
};
