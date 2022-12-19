/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {useState} from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({options, value, onChange}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='x-dropdown'>
      <button className='x-dropdown-button' onClick={() => setOpen(!open)}>
        {options.find((option) => option.value === value)?.label}
      </button>
      {open && (
        <ul className='x-dropdown-menu'>
          {options.map((option) => (
            <li
              key={option.value}
              className={option.value === value ? 'selected' : ''}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
