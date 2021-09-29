/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';

export interface LoadingPropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
}

const LoadingComponent = (props: LoadingPropsType) => {
  const {forawardedRef, className, ...restProps} = props;

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-loading', className)}
      {...restProps}>
      <span className="x-loading-circle"></span>
    </div>
  );
};

const Loading = forwardRef<HTMLDivElement, LoadingPropsType>((props, ref) => {
  return <LoadingComponent {...props} forawardedRef={ref} />;
});

Loading.displayName = 'Loading';
export {Loading};
