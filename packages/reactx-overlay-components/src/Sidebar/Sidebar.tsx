/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import clsx from 'clsx';
import React, {forwardRef, ReactNode, useState} from 'react';
import '../assets/elements.sidebar.scss';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // sidebar content to render
  sidebar: ReactNode;
  // main content to render
  children?: ReactNode;
  // root component optional class
  rootClassName?: string;
  // sidebar optional class
  sidebarClassName?: string;
  // content optional class
  contentClassName?: string;
  // Enable/Disable sidebar shadow
  shadow?: boolean;
  // boolean if sidebar should be docked
  docked: boolean;
  // boolean if sidebar should slide open
  open: boolean;
  // Place the sidebar on the right
  pullRight: boolean;
  // boolean if transitions should be disabled
  transitions?: boolean;
  // Initial sidebar width when page loads
  defaultSidebarWidth?: number;
  // sidebar optional id
  sidebarId?: string;
  // content optional id
  contentId?: string;
  // root component optional id
  rootId?: string;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const {
    rootClassName,
    sidebarClassName,
    contentClassName,
    rootId,
    defaultSidebarWidth,
    shadow,
    docked,
    open,
    pullRight,
    sidebarId,
    sidebar,
    contentId,
    children,
  } = props;

  const sidebarStyle: any = {};
  const contentStyle: any = {};

  const [sidebarWidth, setSidebarWidth] = useState<number>(
    defaultSidebarWidth!,
  );
  const sidebarRefCallback = (ev: HTMLDivElement) => {
    if (ev != null) {
      const width = ev.offsetWidth;
      setSidebarWidth(width);
    }
  };

  const hasBoxShadow = shadow && (open || docked);

  // sidebarStyle right/left
  if (pullRight) {
    sidebarStyle.right = 0;
    sidebarStyle.transform = 'translateX(100%)';
    sidebarStyle.WebkitTransform = 'translateX(100%)';
    if (hasBoxShadow) {
      sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)';
    }
  } else {
    sidebarStyle.left = 0;
    sidebarStyle.transform = 'translateX(-100%)';
    sidebarStyle.WebkitTransform = 'translateX(-100%)';
    if (hasBoxShadow) {
      sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
    }
  }

  if (docked) {
    // show sidebar
    if (sidebarWidth !== 0) {
      sidebarStyle.transform = `translateX(0%)`;
      sidebarStyle.WebkitTransform = `translateX(0%)`;
    }

    // make space on the left/right side of the content for the sidebar
    if (pullRight) {
      contentStyle.right = `${sidebarWidth}px`;
    } else {
      contentStyle.left = `${sidebarWidth}px`;
    }
  } else if (open) {
    // slide open sidebar
    sidebarStyle.transform = `translateX(0%)`;
    sidebarStyle.WebkitTransform = `translateX(0%)`;
  }

  return (
    <div
      className={clsx('x-sidebar', rootClassName)}
      role='navigation'
      ref={ref}
      id={rootId}>
      <div
        className={clsx('x-sidebar__wrapper', sidebarClassName)}
        style={sidebarStyle}
        ref={sidebarRefCallback}
        id={sidebarId}>
        {sidebar}
      </div>
      <div
        className={clsx('x-sidebar__content', contentClassName)}
        style={contentStyle}
        id={contentId}>
        {children}
      </div>
    </div>
  );
});

Sidebar.defaultProps = {
  docked: false,
  open: false,
  transitions: true,
  pullRight: false,
  shadow: true,
  defaultSidebarWidth: 0,
  sidebarId: 'sidebar_id',
  contentId: 'content_id',
  rootId: 'sidebar_root_id',
};

Sidebar.displayName = 'Sidebar';

export {Sidebar};
