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
import '../assets/elements.button.scss';

export interface StepPropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  name: string;
}

const StepComponent = (props: StepPropsType) => {
  const {forawardedRef, className, children, name, ...restProps} = props;

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-wizard__step', className)}
      {...restProps}>
      {children}
    </div>
  );
};

const Step = forwardRef<HTMLDivElement, StepPropsType>((props, ref) => {
  return <StepComponent {...props} forawardedRef={ref} />;
});

Step.displayName = 'Step';
export default Step;
