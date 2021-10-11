/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';

export interface TabPanePropsType
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'hidden'> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  hidden: boolean;
}

const TabPanelComponent = (props: TabPanePropsType) => {
  const {forawardedRef, className, children, hidden, ...restProps} = props;

  return (
    <div
      ref={forawardedRef}
      hidden={hidden}
      role="tabpanel"
      className={classNames('x-tab-panel', className)}
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
};
TabPanel.displayName = 'TabPanel';

export default TabPanel;
