/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef} from 'react';
import {Variant} from '../types';

export interface BadgePropsType extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  forawardedRef?: ForwardedRef<HTMLElement>;
  text: string;
  pill?: boolean;
}

const BadgeComponent = (props: BadgePropsType) => {
  const {forawardedRef, className, text, variant, pill, ...restProps} = props;
  return (
    <span
      ref={forawardedRef}
      className={classNames('x-badge', 'x-badge-' + variant, className, {
        'x-badge--pill': pill,
      })}
      {...restProps}>
      {text}
    </span>
  );
};

const Badge: FC<BadgePropsType> = React.forwardRef<HTMLElement, BadgePropsType>(
  (props, forawardedRef) => (
    <BadgeComponent {...props} forawardedRef={forawardedRef} />
  ),
);
Badge.defaultProps = {
  variant: 'primary',
  pill: false,
};

Badge.displayName = 'Badge';
export {Badge};