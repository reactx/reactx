/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React from 'react';
import {Colors} from '../types';

export interface BadgePropsType extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Colors;
  pill?: boolean;
}

export const Badge: React.FC<BadgePropsType> = ({
  className,
  pill = false,
  color = 'solid',
  children,
  ...restProps
}) => {
  return (
    <span
      className={clsx('x-badge', 'x-badge--' + color, className, {
        'x-badge--pill': pill,
      })}
      {...restProps}>
      {children}
    </span>
  );
};
