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
import '../assets/elements.header.scss';

export interface HeaderPropsType extends React.HTMLAttributes<HTMLHeadElement> {
  forawardedRef?: ForwardedRef<HTMLHeadElement>;
}

const HeaderComponent = (props: HeaderPropsType) => {
  const {forawardedRef, className, children, ...restProps} = props;
  return (
    <header
      ref={forawardedRef}
      className={classNames('x-header', className)}
      {...restProps}>
      {children}
    </header>
  );
};

const Header: FC<HeaderPropsType> = React.forwardRef<
  HTMLHeadElement,
  HeaderPropsType
>((props, forawardedRef) => (
  <HeaderComponent {...props} forawardedRef={forawardedRef} />
));

Header.displayName = 'Header';
export {Header};
