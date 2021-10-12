/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef, useCallback} from 'react';
import '../assets/elements.tab.scss';

export interface TabPropsType
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onChange'> {
  forawardedRef?: ForwardedRef<HTMLLIElement>;
  selected?: boolean;
  name: any;
  onChange?: (name: any) => void;
}

const TabComponent = (props: TabPropsType) => {
  const {
    forawardedRef,
    className,
    children,
    selected,
    name,
    onChange,
    ...restProps
  } = props;

  const handleClick = useCallback(() => {
    if (onChange) onChange(name);
  }, [name, onChange]);

  return (
    <li
      ref={forawardedRef}
      onClick={handleClick}
      className={classNames('x-tab', className, {'x-tab--selected': selected})}
      {...restProps}>
      {children}
    </li>
  );
};

const Tab = forwardRef<HTMLLIElement, TabPropsType>((props, ref) => {
  return <TabComponent {...props} forawardedRef={ref} />;
});
Tab.defaultProps = {
  role: 'tab',
};
Tab.displayName = 'Tab';

export default Tab;
