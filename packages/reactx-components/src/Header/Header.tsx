/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import clsx from 'clsx';
import React, {ForwardedRef} from 'react';
import '../assets/elements.header.scss';

export interface HeaderPropsType extends React.HTMLAttributes<HTMLHeadElement> {
  forawardedRef?: ForwardedRef<HTMLHeadElement>;
}

const HeaderComponent = (props: HeaderPropsType) => {
  const {forawardedRef, className, children, ...restProps} = props;
  return (
    <header
      ref={forawardedRef}
      className={clsx('x-header', className)}
      {...restProps}>
      {children}
    </header>
  );
};

const Header = React.forwardRef<HTMLHeadElement, HeaderPropsType>(
  (props, ref) => <HeaderComponent {...props} forawardedRef={ref} />,
);

Header.displayName = 'Header';
export {Header};
