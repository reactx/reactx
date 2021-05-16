import React, {FC, useEffect, useState} from 'react';
import {Toast, toastProps} from './Toast';

export type toastManagerProps = {
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  toastShowCount: number;
  doNotDisturb?: boolean;
  items: Array<any>;
};

const ToastManagerComponent = (props: toastManagerProps) => {
  const [toastList, SetToastList] = useState<toastProps[]>([]);

  useEffect(() => {
    if (!props.items || props.items.length === 0) return;
    let start = props.items.length - props.toastShowCount;
    let temp = [...props.items].slice(
      start > 0 ? start : 0,
      props.items.length,
    );
    SetToastList(temp);
  }, [props.items, props.toastShowCount]);

  return (
    <div className={'reactx-toast-container' + (' toast-' + props.position)}>
      {!props.doNotDisturb &&
        toastList.map((item, index) => <Toast {...item} key={index} />)}
    </div>
  );
};

const ToastManager: FC<toastManagerProps> = React.forwardRef((props) => (
  <ToastManagerComponent {...props} />
));
ToastManager.defaultProps = {
  position: 'top-right',
  toastShowCount: 3,
};
export {ToastManager};
