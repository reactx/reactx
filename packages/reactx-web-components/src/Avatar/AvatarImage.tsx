/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React from 'react';
import {AvatarName} from './AvatarName';

export interface AvatarImagePropsType
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  letterCount?: number;
}

const AvatarImage = (props: AvatarImagePropsType) => {
  const {name, letterCount, src} = props;

  if (!src) {
    return <AvatarName name={name} letterCount={letterCount} />;
  }

  return <img className={clsx('x-avatar__img')} src={src} alt={name} />;
};

AvatarImage.displayName = 'AvatarImage';

export {AvatarImage};
