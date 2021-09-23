/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {ReactElement, useMemo, useState} from 'react';
import defaultStyles from './styles';

type StylesType = {
  sidebar?: any;
  content?: any;
  root?: any;
};

type SidebarProps = {
  // sidebar content to render
  sidebar: ReactElement<any>;
  // main content to render
  children?: ReactElement<any>;
  // root component optional class
  rootClassName?: string;
  // sidebar optional class
  sidebarClassName?: string;
  // content optional class
  contentClassName?: string;
  // styles
  styles?: StylesType;
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
};

type DefaultSidebarProps = {
  docked: boolean;
  open: boolean;
  transitions: boolean;
  pullRight: boolean;
  shadow: boolean;
  styles: any;
  defaultSidebarWidth: number;
};

type RootPropType = {
  className?: string;
  style: any;
  role: string;
  id?: string;
};

function createDefaultProps(): DefaultSidebarProps {
  return {
    docked: false,
    open: false,
    transitions: true,
    pullRight: false,
    shadow: true,
    styles: {},
    defaultSidebarWidth: 0,
  };
}
export default function Sidebar(userProps: SidebarProps) {
  const defaultProps = useMemo(() => {
    return {...createDefaultProps()};
  }, []);
  const props: SidebarProps = Object.assign(
    {},
    {...defaultProps},
    {...userProps},
  );

  const sidebarStyle = {
    ...defaultStyles.sidebar,
    ...props.styles?.sidebar,
  };

  const contentStyle = {
    ...defaultStyles.content,
    ...props.styles?.content,
  };
  const rootProps: RootPropType = {
    className: props.rootClassName,
    style: {...defaultStyles.root, ...props.styles?.root},
    role: 'navigation',
    id: props.rootId,
  };

  const [sidebarWidth, setSidebarWidth] = useState<number>(
    props.defaultSidebarWidth!,
  );
  const sidebarRefCallback = (ev: HTMLDivElement) => {
    if (ev != null) {
      const width = ev.offsetWidth;
      setSidebarWidth(width);
    }
  };

  const hasBoxShadow = props.shadow && (props.open || props.docked);

  // sidebarStyle right/left
  if (props.pullRight) {
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

  if (props.docked) {
    // show sidebar
    if (sidebarWidth !== 0) {
      sidebarStyle.transform = `translateX(0%)`;
      sidebarStyle.WebkitTransform = `translateX(0%)`;
    }

    // make space on the left/right side of the content for the sidebar
    if (props.pullRight) {
      contentStyle.right = `${sidebarWidth}px`;
    } else {
      contentStyle.left = `${sidebarWidth}px`;
    }
  } else if (props.open) {
    // slide open sidebar
    sidebarStyle.transform = `translateX(0%)`;
    sidebarStyle.WebkitTransform = `translateX(0%)`;
  }

  return (
    <div {...rootProps}>
      <div
        className={props.sidebarClassName}
        style={sidebarStyle}
        ref={sidebarRefCallback}
        id={props.sidebarId}>
        {props.sidebar}
      </div>
      <div
        className={props.contentClassName}
        style={contentStyle}
        id={props.contentId}>
        {props.children}
      </div>
    </div>
  );
}
