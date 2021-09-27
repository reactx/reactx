/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef, forwardRef, useCallback} from 'react';

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
      });
    });
    return childrens;
  }, [value, onChange, children]);

  return (
    <ul
      ref={forawardedRef}
      className={classNames('x-tab-list', className)}
      {...restProps}>
      {getChildrens()}
    </ul>
  );
};

const TabList: FC<TabListPropsType> = forwardRef<
  HTMLUListElement,
  TabListPropsType
>((props, forawardedRef) => {
  return <TabListComponent {...props} forawardedRef={forawardedRef} />;
});
TabList.defaultProps = {
  role: 'tablist',
};
TabList.displayName = 'TabList';

export default TabList;
