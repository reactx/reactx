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

export interface CloseButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  forawardedRef?: ForwardedRef<HTMLButtonElement>;
}

const CloseButtonComponent = (props: CloseButtonPropsType) => {
  const {forawardedRef, className, ...restProps} = props;
  return (
    <button
      ref={forawardedRef}
      type="button"
      aria-label="Close"
      className={classNames('x-btn', 'x-badge-close', className)}
      {...restProps}></button>
  );
};

const CloseButton: FC<CloseButtonPropsType> = React.forwardRef<
  HTMLButtonElement,
  CloseButtonPropsType
>((props, forawardedRef) => (
  <CloseButtonComponent {...props} forawardedRef={forawardedRef} />
));

CloseButton.displayName = 'CloseButton';
export {CloseButton};
