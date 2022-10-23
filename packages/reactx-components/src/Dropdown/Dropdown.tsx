/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useState} from 'react';

export interface DropdownPropsType extends React.HTMLAttributes<HTMLElement> {}

const Dropdown = forwardRef<HTMLElement, DropdownPropsType>((props, ref) => {
  const {className, children, ...restProps} = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={clsx('x-dropdown')} {...restProps}>
      <button onClick={handleOpen}></button>
      {open ? (
        <ul className='x-dropdown__menu'>
          <li className='x-dropdown__menu-item'>
            <button>{children}</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
