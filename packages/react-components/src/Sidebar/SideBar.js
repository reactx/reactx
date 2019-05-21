/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';
import defaultStyles from './styles';

type StylesType = {|
  sidebar: any,
    content: any,
      overlay: any,
        root: any,
|};

type SidebarProps = {
  rootProps: any,

  sidebarClassName: string,
  overlayClassName: string,
  contentClassName: string,

  styles: StylesType,

  touch: boolean,
  shadow: boolean,
  docked: boolean,
  open: boolean,
  pullRight: boolean,
  transitions: boolean,

  sidebarId: string,
  overlayId: string,
  contentId: string,
  rootId: string,

  sidebarChildren: Element<any>,

  onSetOpen(): void;
};

type TouchStateType = {|
  touchStartX: number,
    sidebarWidth: number,
      touchCurrentX: number,
|}

function OverlayClicked(cb: Function) {
  if (cb) {
    //onSetOpen Callback
    cb(false);
  }
}

// calculate the sidebarWidth based on current touch info
function TouchSidebarWidth(props: SidebarProps, state: TouchStateType) {
  // if the sidebar is open and start point of drag is inside the sidebar
  // we will only drag the distance they moved their finger
  // otherwise we will move the sidebar to be below the finger.
  if (props.pullRight) {
    if (
      props.open &&
      window.innerWidth - state.touchStartX < state.sidebarWidth
    ) {
      if (state.touchCurrentX > state.touchStartX) {
        return (
          state.sidebarWidth +
          state.touchStartX -
          state.touchCurrentX
        );
      }
      return state.sidebarWidth;
    }
    return Math.min(
      window.innerWidth - state.touchCurrentX,
      state.sidebarWidth
    );
  }

  if (props.open && state.touchStartX < state.sidebarWidth) {
    if (state.touchCurrentX > state.touchStartX) {
      return state.sidebarWidth;
    }
    return (
      state.sidebarWidth -
      state.touchStartX +
      state.touchCurrentX
    );
  }
  return Math.min(state.touchCurrentX, state.sidebarWidth);
}

function OnTouchStart(ev: Element, ) {
  const touch = ev.targetTouches[0];
  this.setState({
    touchIdentifier: touch.identifier,
    touchStartX: touch.clientX,
    touchCurrentX: touch.clientX
  });

}
function OnTouchMove() {

}
function OnTouchEnd() {

}
function OnScroll() {

}

export default function SideBar(props: SidebarProps) {

  const sidebarRef = React.useRef(null);
  const [dragSupported, setDragSupported] = React.useState(false);
  const [touchIdentifier, setTouchIdentifier] = React.useState(null);
  const [sidebarWidth, setSidebarWidth] = React.useState(props.defaultSidebarWidth);
  const [touchStartX, setTouchStartX] = React.useState(null);
  const [touchCurrentX, setTouchCurrentX] = React.useState(null);

  const useTouch = dragSupported && props.touch;
  const isTouching = touchIdentifier !== null;

  const sidebarStyle = {
    ...defaultStyles.sidebar,
    ...props.styles.sidebar
  };

  const contentStyle = {
    ...defaultStyles.content,
    ...props.styles.content
  };
  const overlayStyle = {
    ...defaultStyles.overlay,
    ...props.styles.overlay
  };
  const rootProps = {
    className: props.rootClassName,
    style: { ...defaultStyles.root, ...props.styles.root },
    role: "navigation",
    id: props.rootId
  };

  let dragHandle;

  const hasBoxShadow =
    props.shadow && (isTouching || props.open || props.docked);
  // sidebarStyle right/left
  if (props.pullRight) {
    sidebarStyle.right = 0;
    sidebarStyle.transform = "translateX(100%)";
    sidebarStyle.WebkitTransform = "translateX(100%)";
    if (hasBoxShadow) {
      sidebarStyle.boxShadow = "-2px 2px 4px rgba(0, 0, 0, 0.15)";
    }
  } else {
    sidebarStyle.left = 0;
    sidebarStyle.transform = "translateX(-100%)";
    sidebarStyle.WebkitTransform = "translateX(-100%)";
    if (hasBoxShadow) {
      sidebarStyle.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.15)";
    }
  }

  if (isTouching) {
    const percentage = TouchSidebarWidth() / sidebarWidth;

    // slide open to what we dragged
    if (props.pullRight) {
      sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`;
      sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`;
    } else {
      sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
      sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) *
        100}%)`;
    }

    // fade overlay to match distance of drag
    overlayStyle.opacity = percentage;
    overlayStyle.visibility = "visible";
  } else if (props.docked) {
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

    // show overlay
    overlayStyle.opacity = 1;
    overlayStyle.visibility = "visible";
  }

  if (isTouching || !props.transitions) {
    sidebarStyle.transition = "none";
    sidebarStyle.WebkitTransition = "none";
    contentStyle.transition = "none";
    overlayStyle.transition = "none";
  }

  if (useTouch) {
    if (props.open) {
      rootProps.onTouchStart = OnTouchStart;
      rootProps.onTouchMove = OnTouchMove;
      rootProps.onTouchEnd = OnTouchEnd;
      rootProps.onTouchCancel = OnTouchEnd;
      rootProps.onScroll = OnScroll;
    } else {
      const dragHandleStyle = {
        ...defaultStyles.dragHandle,
        ...this.props.styles.dragHandle
      };
      dragHandleStyle.width = this.props.touchHandleWidth;

      // dragHandleStyle right/left
      if (this.props.pullRight) {
        dragHandleStyle.right = 0;
      } else {
        dragHandleStyle.left = 0;
      }

      dragHandle = (
        <div
          style={dragHandleStyle}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onTouchCancel={this.onTouchEnd}
        />
      );
    }
  }


  return (
    <div {...props.rootProps}>
      <div
        className={props.sidebarClassName}
        style={sidebarStyle}
        ref={sidebarRef}
        id={props.sidebarId}
      >
        {props.sidebarChildren}
      </div>
      <div
        className={props.overlayClassName}
        style={overlayStyle}
        onClick={() => OverlayClicked(props.onSetOpen)}
        id={props.overlayId}
      />
      <div
        className={props.contentClassName}
        style={contentStyle}
        id={props.contentId}
      >
        {dragHandle}
        {props.children}
      </div>
    </div>
  );
}
