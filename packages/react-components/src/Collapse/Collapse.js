/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element as ReactElement, useEffect, useMemo} from 'react';

const WAITING = 'WAITING';
const RESIZING = 'RESIZING';
const RESTING = 'RESTING';
const IDLING = 'IDLING';

type CollapsePropsType = {|
  children: ReactElement<any>,
  isOpened: boolean,
  forceInitialAnimation?: boolean,
  hasNestedCollapse?: boolean,
  fixedHeight?: number,
  style: any,
  collapseClassName: string,
  contentClassName: string,
  onMeasure: () => void,
|};

type CollapseStateType = {|
  currentState: WAITING | RESIZING | RESTING | IDLING,
  from: number,
  to: number,
|};

function createDefaultProps(): DefaultSidebarProps {
  return {
    forceInitialAnimation: false,
    hasNestedCollapse: false,
    fixedHeight: -1,
    style: {},
    collapseClassName: 'ReactCollapse--collapse',
    contentClassName: 'ReactCollapse--content',
  };
}

export default function Collapse(userProps: CollapsePropsType) {
  const defaultProps = useMemo(() => {
    return {...createDefaultProps()};
  }, []);
  const props: SidebarProps = Object.assign(
    {},
    {...defaultProps},
    {...userProps},
  );
  const [state, setState] = React.useState({
    currentState: IDLING,
    from: 0,
    to: 0,
  });

  const height = 100;

  const getWrapperStyle = height => {
    if (state.currentState === IDLING && state.to) {
      const {fixedHeight} = props;
      if (fixedHeight > -1) {
        return {overflow: 'hidden', height: fixedHeight};
      }
      return {height: 'auto'};
    }

    if (state.currentState === WAITING && !state.to) {
      return {overflow: 'hidden', height: 0};
    }

    return {overflow: 'hidden', height: Math.max(0, height)};
  };

  const onContentRefCallback = React.useCallback(content => {
    if (content === null) {
      return;
    }
    setState({
      ...state,
      fixedHeight:
        props.fixedHeight > -1 ? props.fixedHeight : content.clientHeight,
    });
  }, []);

  const onWrapperRefCallback = React.useCallback(wrapper => {
    if (wrapper === null) {
      return;
    }
    if (props.isOpened) {
      setState({...state, currentState: IDLING, from: state.to});
    }
    return;
  }, []);

  useEffect(() => {
    if (state.currentState === WAITING) return;
    setState({...state, currentState: WAITING});
  }, [props.hasNestedCollapse, state]);

  return (
    <div
      ref={onWrapperRefCallback}
      className={props.collapseClassName}
      style={{...getWrapperStyle(Math.max(0, height)), ...props.style}}>
      <div ref={onContentRefCallback} className={props.contentClassName}>
        {props.children}
      </div>
    </div>
  );
}
