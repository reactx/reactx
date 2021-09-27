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

export interface CardHeaderPropsType
  extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
}

const CardHeaderComponent = (props: CardHeaderPropsType) => {
  const {forawardedRef, className, children, ...restProps} = props;
  return (
    <div
      ref={forawardedRef}
      className={classNames('x-header', className)}
      {...restProps}>
      {children}
    </div>
  );
};

const CardHeader: FC<CardHeaderPropsType> = React.forwardRef<
  HTMLDivElement,
  CardHeaderPropsType
>((props, forawardedRef) => (
  <CardHeaderComponent {...props} forawardedRef={forawardedRef} />
));

CardHeader.displayName = 'CardHeader';
export default CardHeader;
