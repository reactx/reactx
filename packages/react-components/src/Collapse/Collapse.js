// /**
//  * Copyright (c) ReactX and its affiliates.
//  *
//  * This source code is licensed under the MIT license found in the
//  * LICENSE file in the root directory of this source tree.
//  *
//  * @flow
//  */

// import React, { type Element as ReactElement } from 'react';

// const WAITING = 'WAITING';
// const RESIZING = 'RESIZING';
// const RESTING = 'RESTING';
// const IDLING = 'IDLING';

// type CollapsePropsType = {|
//   children: ReactElement < any >,
//     isOpened: boolean,
//       forceInitialAnimation ?: boolean,
//       hasNestedCollapse ?: boolean,
//       fixedHeight ?: number,
//       style: any,
//         collapseClassName: string,
//           contentClassName: string,
//             onMeasure: () => void,
// |};

// type CollapseStateType = {|
//   currentState: WAITING | RESIZING | RESTING | IDLING,
//     from: number,
//       to: number,
// |};

// function createDefaultProps(): DefaultSidebarProps {
//   return {
//     forceInitialAnimation: false,
//     hasNestedCollapse: false,
//     fixedHeight: -1,
//     style: {},
//     collapseClassName: 'ReactCollapse--collapse',
//     contentClassName: 'ReactCollapse--content'
//   };
// }

// const getWrapperStyle = height => {
//   if (this.state.currentState === IDLING && this.state.to) {
//     const { fixedHeight } = this.props;
//     if (fixedHeight > -1) {
//       return { overflow: 'hidden', height: fixedHeight };
//     }
//     return { height: 'auto' };
//   }

//   if (this.state.currentState === WAITING && !this.state.to) {
//     return { overflow: 'hidden', height: 0 };
//   }

//   return { overflow: 'hidden', height: Math.max(0, height) };
// };

// export default function Collapse(userProps: CollapsePropsType) {
//   const props: CollapsePropsType = Object.assign(
//     {},
//     { ...createDefaultProps() },
//     { ...userProps },
//   );

//   const [state, setState] = React.useState({
//     currentState: IDLING,
//     from: 0,
//     to: 0,
//   });


//   const height = 100;

//   const onContentRefCallback = React.useCallback(content => {
//     if (e === null) {
//       return;
//     }
//     setState(...state, ((props.fixedHeight > -1) ? fixedHeight : content.clientHeight));
//   }, []);

//   const onWrapperRefCallback = React.useCallback(wrapper => {
//     if (e === null) {
//       return;
//     }
//     if (props.isOpened) {
//       if (props.forceInitialAnimation) {
//         setState(...state, { currentState: RESIZING, from: wrapper.clientHeight });
//       } else {
//         setState(...state, { currentState: IDLING, from: state.to });
//       }
//     };
//     return;
//   }, []);

//   React.useEffect(() => {
//     setState(...state, { currentState: WAITING })
//   }, [props.hasNestedCollapse, state])

//   return (
//     <div
//       ref={onWrapperRefCallback}
//       className={props.collapseClassName}
//       style={{ ...this.getWrapperStyle(Math.max(0, height)), ...props.style }}>
//       <div ref={onContentRefCallback} className={props.contentClassName}>{props.children}</div>
//     </div>
//   );


// }

// //https://github.com/nkbt/react-collapse/blob/4.x/src/Collapse.js