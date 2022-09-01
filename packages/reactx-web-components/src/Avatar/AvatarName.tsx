/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import { __DEV__ } from '../../../reactx-base';

export interface AvatarNamePropsType {
  name: string;
  letterCount?: number;
}

const AvatarName = (props: AvatarNamePropsType) => {
  const {name, letterCount} = props;

  return (
    <div role={'img'} className={clsx('x-avatar__img')}>
      {name
        .substring(0, letterCount)
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())}
    </div>
  );
};

if (__DEV__) {
    AvatarName.displayName = 'AvatarName';
}

export { AvatarName };

