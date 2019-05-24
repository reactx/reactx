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
          dragHandle: any,
|};

type SidebarProps = {
  // sidebar content to render
  sidebar: Element<any>,
  // main content to render
  children: Element<any>,
  // root component optional class
  rootClassName?: string,
  // sidebar optional class
  sidebarClassName?: string,
  // overlay optional class
  overlayClassName?: string,
  // content optional class
  contentClassName?: string,
  // styles
  styles?: StylesType,
  // boolean if touch gestures are enabled
  touch?: boolean,
  // Enable/Disable sidebar shadow
  shadow?: boolean,
  // boolean if sidebar should be docked
  docked?: boolean,
  // boolean if sidebar should slide open
  open?: boolean,
  // Place the sidebar on the right
  pullRight?: boolean,
  // boolean if transitions should be disabled
  transitions?: boolean,
  // max distance from the edge we can start touching
  touchHandleWidth?: number,
  // distance we have to drag the sidebar to toggle open state
  dragToggleDistance?: number,
  // Initial sidebar width when page loads
  defaultSidebarWidth?: number,
  // sidebar optional id
  sidebarId?: string,
  // overlay optional id
  overlayId?: string,
  // content optional id
  contentId?: string,
  // root component optional id
  rootId?: string,
  // callback called when the overlay is clicked
  onSetOpen(): void,
};

type TouchStateType = {|
  touchStartX: number,
    sidebarWidth: number,
      touchCurrentX: number,
|};

type DefaultSidebarProps = {
  docked: boolean,
  open: boolean,
  transitions: boolean,
  touch: boolean,
  touchHandleWidth: number,
  pullRight: boolean,
  shadow: boolean,
  dragToggleDistance: number,
  onSetOpen: () => any,
  styles: any,
  defaultSidebarWidth: number,
};

function OverlayClicked(cb: Function) {
  if (cb) {
    //onSetOpen Callback
    cb(false);
  }
}

// calculate the sidebarWidth based on current touch info
function TouchSidebarWidth(props: SidebarProps, state: TouchStateType) {
  debugger
  // if the sidebar is open and start point of drag is inside the sidebar
  // we will only drag the distance they moved their finger
  // otherwise we will move the sidebar to be below the finger.
  if (props.pullRight) {
    if (
      props.open &&
      window.innerWidth - state.touchStartX < state.sidebarWidth
    ) {
      if (state.touchCurrentX > state.touchStartX) {
        return state.sidebarWidth + state.touchStartX - state.touchCurrentX;
      }
      return state.sidebarWidth;
    }
    return Math.min(
      window.innerWidth - state.touchCurrentX,
      state.sidebarWidth,
    );
  }

  if (props.open && state.touchStartX < state.sidebarWidth) {
    if (state.touchCurrentX > state.touchStartX) {
      return state.sidebarWidth;
    }
    return state.sidebarWidth - state.touchStartX + state.touchCurrentX;
  }
  return Math.min(state.touchCurrentX, state.sidebarWidth);
}

function OnScroll() { }

function createDefaultProps(): DefaultSidebarProps {
  return {
    docked: false,
    open: false,
    transitions: true,
    touch: true,
    touchHandleWidth: 20,
    pullRight: false,
    shadow: true,
    dragToggleDistance: 30,
    onSetOpen: () => { },
    styles: {},
    defaultSidebarWidth: 0,
  };
}

function useTouch() {
  const [touchIdentifier, setTouchIdentifier] = React.useState(null);
  const [touchStartX, setTouchStartX] = React.useState(null);
  const [touchCurrentX, setTouchCurrentX] = React.useState(null);

  const OnTouchMove = (ev: Element) => {
    for (let ind = 0; ind < ev.targetTouches.length; ind++) {
      // we only care about the finger that we are tracking
      if (ev.targetTouches[ind].identifier === touchIdentifier) {
        setTouchCurrentX(ev.targetTouches[ind].clientX)
        break;
      }
    }
  }

  const OnTouchStart = (ev: Element) => {
    const touch = ev.targetTouches[0];
    setTouchIdentifier(touch.identifier);
    setTouchStartX(touch.clientX);
    setTouchCurrentX(touch.clientX);
  }

  const OnTouchEnd = (ev: Element) => {
    // const touchWidth = TouchSidebarWidth();
    // if (
    //   (props.open &&
    //     touchWidth <
    //       sidebarWidth - props.dragToggleDistance) ||
    //   (!props.open && touchWidth > props.dragToggleDistance)
    // ) {
    //   props.onSetOpen(!props.open);
    // }
    // TouchEndCB({
    //   touchIdentifier: null,
    //   touchStartX: null,
    //   touchCurrentX: null
    // });
  }

  return [
    OnTouchMove,
    OnTouchStart,
    OnTouchEnd,
    touchIdentifier,
    touchCurrentX,
    touchStartX,
  ];
}

export default function SideBar(userProps: SidebarProps) {
  debugger
  const props: TaskProps = Object.assign(
    {},
    { ...createDefaultProps() },
    { ...userProps },
  );
  const isIos = /iPad|iPhone|iPod/.test(navigator ? navigator.userAgent : "");
  const dragSupported = typeof window === "object" && "ontouchstart" in window && !isIos;
  const usingTouch = dragSupported && props.touch;

  const sidebarStyle = {
    ...defaultStyles.sidebar,
    ...props.styles.sidebar,
  };

  const contentStyle = {
    ...defaultStyles.content,
    ...props.styles.content,
  };
  const overlayStyle = {
    ...defaultStyles.overlay,
    ...props.styles.overlay,
  };
  const rootProps = {
    className: props.rootClassName,
    style: { ...defaultStyles.root, ...props.styles.root },
    role: 'navigation',
    id: props.rootId,
  };


  const [sidebarWidth, setSidebarWidth] = React.useState(props.defaultSidebarWidth);
  const sidebarRefCallback = (ev) => {
    if (ev != null) {
      const width = ev.offsetWidth;
      setSidebarWidth(width);
    }
  };

  const [OnTouchMove, OnTouchStart, OnTouchEnd, touchIdentifier] = useTouch();

  const isTouching = touchIdentifier !== null;
  const hasBoxShadow = props.shadow && (isTouching || props.open || props.docked);

  let dragHandle;
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

  if (isTouching) {
    const percentage = TouchSidebarWidth(props) / sidebarWidth;

    // slide open to what we dragged
    if (props.pullRight) {
      sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`;
      sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`;
    } else {
      sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
      sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`;
    }

    // fade overlay to match distance of drag
    overlayStyle.opacity = percentage;
    overlayStyle.visibility = 'visible';
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
    overlayStyle.visibility = 'visible';
  }
  if (isTouching || !props.transitions) {
    sidebarStyle.transition = 'none';
    sidebarStyle.WebkitTransition = 'none';
    contentStyle.transition = 'none';
    overlayStyle.transition = 'none';
  }

  if (usingTouch) {
    if (props.open) {
      rootProps.onTouchStart = OnTouchStart
      rootProps.onTouchMove = OnTouchMove;
      rootProps.onTouchEnd = OnTouchEnd;
      rootProps.onTouchCancel = OnTouchEnd;
      rootProps.onScroll = OnScroll;
    } else {
      const dragHandleStyle = {
        ...defaultStyles.dragHandle,
        ...props.styles.dragHandle,
      };
      dragHandleStyle.width = props.touchHandleWidth;

      // dragHandleStyle right/left
      if (props.pullRight) {
        dragHandleStyle.right = 0;
      } else {
        dragHandleStyle.left = 0;
      }

      dragHandle = (
        <div
          style={dragHandleStyle}
          onTouchStart={OnTouchStart}
          onTouchMove={OnTouchMove}
          onTouchEnd={OnTouchEnd}
          onTouchCancel={OnTouchEnd}
        />
      );
    }
  }

  return (
    <div ref={sidebarRefCallback} {...rootProps} >
      <div
        className={props.sidebarClassName}
        style={sidebarStyle}
        
        id={props.sidebarId}>
        {props.sidebar}
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
        id={props.contentId}>
        {dragHandle}
        {props.children}
      </div>
    </div>
  );
}
