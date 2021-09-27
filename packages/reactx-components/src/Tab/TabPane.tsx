/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef, forwardRef} from 'react';

export interface TabPanePropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  value?: string | number;
}

const TabPaneComponent = (props: TabPanePropsType) => {
  const {forawardedRef, className, children, value, onChange, ...restProps} =
    props;

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-tab-pane', className)}
      {...restProps}>
      {children}
    </div>
  );
};

const TabPane: FC<TabPanePropsType> = forwardRef<
  HTMLDivElement,
  TabPanePropsType
>((props, forawardedRef) => {
  return <TabPaneComponent {...props} forawardedRef={forawardedRef} />;
});
TabPane.displayName = 'TabPane';

export default TabPane;
