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
import TabList from './TabList';
import TabPane from './TabPane';

export interface TabPropsType
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onChange'> {
  forawardedRef?: ForwardedRef<HTMLLIElement>;
  selected?: boolean;
  name: string | number;
  onChange: (name: string | number) => void;
}

const TabComponent = (props: TabPropsType) => {
  const {
    forawardedRef,
    className,
    children,
    hidden,
    selected,
    tabIndex,
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
  hidden: false,
};
Tab.displayName = 'Tab';

export default Object.assign(Tab, {
  List: TabList,
  Pane: TabPane,
});
