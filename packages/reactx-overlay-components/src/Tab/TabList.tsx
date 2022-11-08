/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {ForwardedRef, forwardRef, useCallback} from 'react';
import Tab from './Tab';
import TabPanel from './TabPanel';

export interface TabListPropsType
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange'> {
  forawardedRef?: ForwardedRef<HTMLUListElement>;
  value?: string | number;
  onChange: (name: string | number) => void;
}

const TabListComponent = (props: TabListPropsType) => {
  const {forawardedRef, className, children, value, onChange, ...restProps} =
    props;

  const getChildrens = useCallback(() => {
    const childrens = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child, {
        selected: child.props.name === value,
        onChange,
      } as any);
    });
    return childrens;
  }, [value, onChange, children]);

  return (
    <ul
      ref={forawardedRef}
      className={clsx('x-tab-list', className)}
      {...restProps}>
      {getChildrens()}
    </ul>
  );
};

const TabList = forwardRef<HTMLUListElement, TabListPropsType>((props, ref) => {
  return <TabListComponent {...props} forawardedRef={ref} />;
});
TabList.defaultProps = {
  role: 'tablist',
};
TabList.displayName = 'TabList';

export default Object.assign(TabList, {
  Item: Tab,
  Panel: TabPanel,
});
