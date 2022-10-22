/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';

import '../assets/elements.badge.scss';
import {Variant} from '../types';

export interface BadgePropsType extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  text?: string;
  pill?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgePropsType>((props, ref) => {
  const {className, text, variant, pill, ...restProps} = props;
  return (
    <span
      ref={ref}
      className={clsx('x-badge', 'x-badge--' + variant, className, {
        'x-badge--pill': pill,
      })}
      {...restProps}>
      {text}
    </span>
  );
});

Badge.defaultProps = {
  variant: 'primary',
  pill: false,
};

Badge.displayName = 'Badge';

export {Badge};
