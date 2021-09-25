/**
 * Copyright (c) Pascal System and ReactX.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef} from 'react';
import {Variant} from '../../types';
import {CardFooter} from '../CardFooter/CardFooter';
import {CardHeader} from '../CardHeader/CardHeader';
import {CardImage} from '../CardImage/CardImage';

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

const CardBody: FC<CardPropsType> = React.forwardRef<
  HTMLDivElement,
  CardPropsType
>((props, forawardedRef) => (
  <CardComponent {...props} forawardedRef={forawardedRef} />
));

CardBody.defaultProps = {
  variant: 'primary',
};

CardBody.displayName = 'Card';

const Card = Object.assign(CardBody, {
  Img: CardImage,
  Header: CardHeader,
  Footer: CardFooter,
});

export {Card};
