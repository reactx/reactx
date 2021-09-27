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

export interface CardImagePropsType
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'top' | 'bottom';
  forawardedRef?: ForwardedRef<HTMLImageElement>;
}

const CardImageComponent = (props: CardImagePropsType) => {
  const {forawardedRef, className, variant, ...restProps} = props;
  return (
    <img
      ref={forawardedRef}
      className={classNames('x-card-img', 'x-card-img-' + variant, className)}
      {...restProps}
    />
  );
};

const CardImage: FC<CardImagePropsType> = React.forwardRef<
  HTMLImageElement,
  CardImagePropsType
>((props, forawardedRef) => (
  <CardImageComponent {...props} forawardedRef={forawardedRef} />
));
CardImage.defaultProps = {
  variant: 'top',
};

CardImage.displayName = 'CardImage';
export default CardImage;
