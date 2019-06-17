/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Element} from 'react';
import {connectDropTarget} from '../DropUtils';
import {useDragDropContext} from '../ContextManager';
import {FindReactElement} from '../ElementUtils';
import {Actions} from '../../inline-typed'
import uuid from 'uuid';

export type DropTargetProps = {|
  index: number,
  componentType: string,
  children: Element<any>,
  style: any,
  canDropFrom: string[],
  onDragLeave: (event: EventTarget) => void,
  onDragOver: (event: EventTarget) => void,
  onDragEnter: (event: EventTarget) => void,
  onDrop: (
    event: EventTarget,
    source: EventTarget | null,
    sourceElement: Element<any>,
  ) => void,
|};

export function useDrop(props: DropTargetProps) {
  const [item, dispatch] = useDragDropContext();
  
  function drop(event: EventTarget, targetId:string) {    
    const currentReactNode = FindReactElement(item.source);

    const newReactEmenet = React.cloneElement(
      currentReactNode,
      {
        //TODO: use uuid
        key: item.sourceId,        
      },
      [...currentReactNode.memoizedProps.children],
    );
    let payload = {
      newItem: newReactEmenet,      
      sourceId: item.sourceId,
      source: item.source,
      target: event,
      targetId
    };

    dispatch({
      type: Actions.DROP,
      payload,
    });
        
    if (props.onDrop) {
      props.onDrop(event, currentReactNode, newReactEmenet);
    }
        
    // if (item.source.dropEffect === 'move') {
    //   currentReactNode.stateNode.remove();
    // }
  }
  function dragEnter(event: EventTarget, targetId:string) {
// let payload ={
//   targetId,
//   target: event,
//   source: item,
//   sourceId:item.sourceId,
// };
    // dispatch({
    //   type: Actions.DRAG_ENTER,
    //   payload
    // });
        
    if (props.onDragEnter) {
      props.onDragEnter(event);
    }
  }
  function dragOver(event: EventTarget, targetId:string) {
    if (props.onDragOver) {
      props.onDragOver(event);
    }
    // event.preventDefault();
  }
  function dragLeave(event: EventTarget, targetId:string) {
    if (props.onDragLeave) {
      props.onDragLeave(event);
    }
    // event.preventDefault();
  }
  return [drop, dragOver, dragEnter, dragLeave];
}

function CloningElement(target, children) {
  return React.Children.map(target, Target => {
    //TODO: define target based on offset
    return React.cloneElement(Target, {
      children: [target.props.children, ...children],
    });
  });
}

function Component(props: DropTargetProps) {  
  const [targetId, setTargetId] = React.useState(null);
  const [item] = useDragDropContext();
  const [children, setChildren] = React.useState([]);
  const dropRef = React.useRef(null);

  const [drop, dragOver, dragEnter, dragLeave] = useDrop(props);

  React.useEffect(() => {
    if(props.forwardedref){
      props.forwardedref = dropRef;
    }
    let tempTargetId = targetId;
    if(tempTargetId === null){
      setTargetId(uuid.v4());
    }
    
    if(item && item.didDrop === true && item.targetId === targetId){      
      setChildren(c => c.concat(item.newItem))      
    }

    if(item)
      return connectDropTarget(dropRef.current, {
        targetId:tempTargetId,
        drop,
        dragEnter,
        dragOver,
        dragLeave,
      });
    
  }, [item]);

  return (
    <div style={props.style} ref={dropRef}>
      {CloningElement(props.children, children)}
    </div>
  );
}


//TODO:Change to memoizable CP
const DropTarget: any = React.memo((props: DropTargetProps) => {
  return (
    <Component {...props} forwardedref={props.ref}>
      {props.children}
    </Component>
  );
});

export default DropTarget;
