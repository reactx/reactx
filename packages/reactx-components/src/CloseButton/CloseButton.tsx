/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef} from 'react';
import '../assets/elements.closebutton.scss';

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
      className={classNames('x-btn--close', className)}
      {...restProps}>
      &times;
    </button>
  );
};

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonPropsType>(
  (props, ref) => <CloseButtonComponent {...props} forawardedRef={ref} />,
);

CloseButton.displayName = 'CloseButton';
export {CloseButton};
