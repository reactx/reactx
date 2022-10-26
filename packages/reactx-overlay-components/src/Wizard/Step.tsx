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

export interface StepPropsType extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

const Step = forwardRef<HTMLDivElement, StepPropsType>((props, ref) => {
  const {className, children, name, ...restProps} = props;

  return (
    <div ref={ref} className={clsx('x-wizard__step', className)} {...restProps}>
      {children}
    </div>
  );
});

Step.displayName = 'Step';
export default Step;
