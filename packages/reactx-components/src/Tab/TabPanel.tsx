/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {ForwardedRef, forwardRef} from 'react';

export interface TabPanePropsType
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'hidden'> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  hidden: boolean;
  unmountOnExit?: boolean;
}

const TabPanelComponent = (props: TabPanePropsType) => {
  const {
    forawardedRef,
    className,
    children,
    hidden,
    unmountOnExit,
    ...restProps
  } = props;

  return unmountOnExit ? (
    !hidden ? (
      <div
        ref={forawardedRef}
        role='tabpanel'
        className={clsx('x-tab-panel', className)}
        {...restProps}>
        {children}
      </div>
    ) : null
  ) : (
    <div
      ref={forawardedRef}
      hidden={hidden}
      role='tabpanel'
      className={clsx('x-tab-panel', className)}
      {...restProps}>
      {children}
    </div>
  );
};

const TabPanel = forwardRef<HTMLDivElement, TabPanePropsType>((props, ref) => {
  return <TabPanelComponent {...props} forawardedRef={ref} />;
});
TabPanel.defaultProps = {
  hidden: true,
  unmountOnExit: false,
};
TabPanel.displayName = 'TabPanel';

export default TabPanel;
