/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useEffect, useRef} from 'react';

import '../assets/elements.skeleton.scss';

export interface SkeletonPropsType
  extends React.HTMLAttributes<HTMLDivElement> {}

const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonPropsType>((props, ref) => {
  const {className, children, ...restProps} = props;
  const isFirstRender = useIsFirstRender();

  return (
    <div
      ref={ref}
      className={clsx(
        'x-skeleton',
        className,
        isFirstRender && 'x-skeleton--animate',
      )}
      {...restProps}></div>
  );
});

Skeleton.displayName = 'Icon';
export {Skeleton};
