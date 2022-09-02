/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import '../assets/elements.card.scss';
import {Variant} from '../types';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardImage from './CardImage';

export interface CardPropsType extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
}

const Card = forwardRef<HTMLDivElement, CardPropsType>((props, ref) => {
  const {className, children, variant, ...restProps} = props;
  return (
    <div
      ref={ref}
      className={clsx('x-card', 'x-card--' + variant, className)}
      {...restProps}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
Card.defaultProps = {
  variant: 'primary',
};

export default Object.assign(Card, {
  Img: CardImage,
  Header: CardHeader,
  Footer: CardFooter,
});
