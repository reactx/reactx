/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useCallback} from 'react';
import '../assets/elements.tab.scss';

export interface TabPropsType
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onChange'> {
  selected?: boolean;
  name: any;
  onChange?: (name: any) => void;
}

const Tab = forwardRef<HTMLLIElement, TabPropsType>((props, ref) => {
  const {className, children, selected, name, onChange, ...restProps} = props;

  const handleClick = useCallback(() => {
    if (onChange) onChange(name);
  }, [name, onChange]);

  return (
    <li
      ref={ref}
      onClick={handleClick}
      className={clsx('x-tab', className, {'x-tab--selected': selected})}
      {...restProps}>
      {children}
    </li>
  );
});

Tab.defaultProps = {
  role: 'tab',
};
Tab.displayName = 'Tab';

export default Tab;
