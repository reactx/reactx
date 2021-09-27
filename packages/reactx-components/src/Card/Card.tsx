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
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardImage from './CardImage';

export interface CardPropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  variant?: Variant;
}

const CardComponent = (props: CardPropsType) => {
  const {forawardedRef, className, children, variant, ...restProps} = props;
  return (
    <div
      ref={forawardedRef}
      className={classNames('x-card', 'x-card-' + variant, className)}
      {...restProps}>
      {children}
    </div>
  );
};

const Card: FC<CardPropsType> = React.forwardRef<HTMLDivElement, CardPropsType>(
  (props, forawardedRef) => (
    <CardComponent {...props} forawardedRef={forawardedRef} />
  ),
);

Card.defaultProps = {
  variant: 'primary',
};

Card.displayName = 'Card';

export default Object.assign(Card, {
  Img: CardImage,
  Header: CardHeader,
  Footer: CardFooter,
});
