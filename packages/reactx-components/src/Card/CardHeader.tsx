/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {ForwardedRef} from 'react';

export interface CardHeaderPropsType
  extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
}

const CardHeaderComponent = (props: CardHeaderPropsType) => {
  const {forawardedRef, className, children, ...restProps} = props;
  return (
    <div
      ref={forawardedRef}
      className={clsx('x-header', className)}
      {...restProps}>
      {children}
    </div>
  );
};

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderPropsType>(
  (props, ref) => <CardHeaderComponent {...props} forawardedRef={ref} />,
);

CardHeader.displayName = 'CardHeader';
export default CardHeader;
