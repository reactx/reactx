/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {ForwardedRef} from 'react';
import '../assets/elements.form-control.scss';

export interface TextAreaPropsType
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  forawardedRef?: ForwardedRef<HTMLTextAreaElement>;
}

const TextAreaComponent = (props: TextAreaPropsType) => {
  const {forawardedRef, className, children, ...restProps} = props;
  return (
    <textarea
      ref={forawardedRef}
      className={clsx('x-form-control', className)}
      {...restProps}>
      {children}
    </textarea>
  );
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaPropsType>(
  (props, ref) => <TextAreaComponent {...props} forawardedRef={ref} />,
);
TextArea.defaultProps = {
  rows: 10,
};
TextArea.displayName = 'TextArea';
export default TextArea;
