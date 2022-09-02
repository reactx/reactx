/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import '../assets/elements.avatar.scss';
import {AvatarImage} from './AvatarImage';
import {Loading} from '../../../reactx-base';

export interface AvatarPropsType extends React.HTMLAttributes<HTMLSpanElement> {
  letterCount?: number;
  pill?: boolean;
  name: string;
  src?: string;
  loading?: boolean | React.ReactNode;
}

const Avatar = forwardRef<HTMLSpanElement, AvatarPropsType>((props, ref) => {
  const {
    className,
    name,
    children,
    letterCount,
    src,
    pill,
    loading,
    ...restProps
  } = props;

  return (
    <span
      ref={ref}
      className={clsx('x-avatar', className, {'x-avatar-pill': pill})}
      {...restProps}>
      <AvatarImage src={src} name={name} letterCount={letterCount}>
        {children}
      </AvatarImage>
      {loading && (typeof loading === 'boolean' ? <Loading /> : loading)}
    </span>
  );
});

Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  pill: true,
  loading: false,
  letterCount: 1,
};

export {Avatar};
