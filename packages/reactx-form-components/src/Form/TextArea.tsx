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
import '../assets/elements.form-control.scss';

export interface TextAreaPropsType
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaPropsType>(
  (props, ref) => {
    const {className, children, ...restProps} = props;
    return (
      <textarea
        ref={ref}
        className={clsx('x-form-control', className)}
        {...restProps}>
        {children}
      </textarea>
    );
  },
);
TextArea.defaultProps = {
  rows: 10,
};
TextArea.displayName = 'TextArea';
export default TextArea;