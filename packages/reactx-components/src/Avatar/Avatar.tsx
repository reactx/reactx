/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';
import {Loading} from '../Loading/Loading';

export interface AvatarPropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  letterCount?: number;
  pill?: boolean;
  text: string;
  src?: string;
  loading?: boolean | React.ReactNode;
}

const AvatarComponent = (props: AvatarPropsType) => {
  const {
    forawardedRef,
    className,
    text,
    letterCount,
    src,
    pill,
    loading,
    ...restProps
  } = props;

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-avatar', className, {'x-avatar-pill': pill})}
      {...restProps}>
      {src ? (
        <img src={src} alt={text} />
      ) : (
        <span className="reactx-avatar-letter">
          {text
            .substring(0, letterCount)
            .trim()
            .replace(/^\w/, (c) => c.toUpperCase())}
        </span>
      )}
      {loading && (typeof loading === 'boolean' ? <Loading /> : loading)}
    </div>
  );
};

const Avatar = forwardRef<HTMLDivElement, AvatarPropsType>((props, ref) => {
  return <AvatarComponent {...props} forawardedRef={ref} />;
});

Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  pill: true,
  loading: false,
  letterCount: 1,
};
export {Avatar};
