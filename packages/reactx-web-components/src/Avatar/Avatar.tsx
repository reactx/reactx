/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from "clsx";
import React from "react";

export interface AvatarPropsType
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  height: string;
  width: string;
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarPropsType> = (props) => {
  const {className, height, width, src, alt, children, ...restProps} = props;

  return (
    <img
      className={clsx('x-avatar', className)}
      width={width}
      height={height}
      src={src}
      alt={alt}
      {...restProps}>
    </img>
  )
}
export default Avatar;
