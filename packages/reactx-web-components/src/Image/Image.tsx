/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';
import '../assets/elements.image.scss';

export interface ImagePropsType
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = forwardRef<HTMLImageElement, ImagePropsType>((props, ref) => {
  const {className, ...restProps} = props;

  return <img ref={ref} className={clsx('x-img', className)} {...restProps} />;
});

Image.displayName = 'Image';

export {Image};
