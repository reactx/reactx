/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React from 'react';

export interface TextAreaPropsType
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaPropsType> = (props) => {
  const {className, children, rows = 10, cols = 50, ...restProps} = props;
  return (
    <textarea
      className={clsx('x-form-control', className)}
      rows={rows}
      cols={cols}
      {...restProps}>
      {children}
    </textarea>
  );
};
export default TextArea;
