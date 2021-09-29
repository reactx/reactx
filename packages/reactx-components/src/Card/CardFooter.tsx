/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef} from 'react';

export interface CardFooterPropsType
  extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
}

const CardFooterComponent = (props: CardFooterPropsType) => {
  const {forawardedRef, className, children, ...restProps} = props;
  return (
    <div
      ref={forawardedRef}
      className={classNames('x-footer', className)}
      {...restProps}>
      {children}
    </div>
  );
};

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterPropsType>(
  (props, ref) => <CardFooterComponent {...props} forawardedRef={ref} />,
);

CardFooter.displayName = 'CardFooter';
export default CardFooter;
