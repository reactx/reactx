/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';

export interface CardImagePropsType
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const CardImage = forwardRef<HTMLImageElement, CardImagePropsType>(
  (props, ref) => {
    const {className, ...restProps} = props;
    return (
      <img
        ref={ref}
        className={clsx('x-card__img', className)}
        {...restProps}
      />
    );
  },
);

CardImage.displayName = 'CardImage';

export default CardImage;