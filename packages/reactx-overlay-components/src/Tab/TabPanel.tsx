/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';

export interface TabPanelPropsType
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'hidden'> {
  hidden: boolean;
  unmountOnExit?: boolean;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelPropsType>((props, ref) => {
  const {className, children, hidden, unmountOnExit, ...restProps} = props;

  return unmountOnExit ? (
    !hidden ? (
      <div
        ref={ref}
        role='tabpanel'
        className={clsx('x-tab-panel', className)}
        {...restProps}>
        {children}
      </div>
    ) : null
  ) : (
    <div
      ref={ref}
      hidden={hidden}
      role='tabpanel'
      className={clsx('x-tab-panel', className)}
      {...restProps}>
      {children}
    </div>
  );
});

TabPanel.defaultProps = {
  hidden: true,
  unmountOnExit: false,
};
TabPanel.displayName = 'TabPanel';

export default TabPanel;
