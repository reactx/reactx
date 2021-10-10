import {ICellRendererParams} from '@ag-grid-community/core';
import React, {
  createRef,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

interface ActionRendererElementType {
  showButton: () => void;
  hideButton: () => void;
}

export interface ActionRendererWrapper {
  children?: React.ReactNode;
  forawardedRef?: ForwardedRef<ActionRendererElementType>;
  value?: any;
}
function ActionRendererWrapper(props: ActionRendererWrapper) {
  const {forawardedRef, children, value} = props;
  const [showAction, setShowAction] = useState(false);
  useImperativeHandle(forawardedRef, () => {
    return {
      showButton() {
        setShowAction(true);
      },
      hideButton() {
        setShowAction(false);
      },
    };
  });

  return showAction ? children : value || '';
}

const ActionButtonRenderer = forwardRef<
  ActionRendererElementType,
  ICellRendererParams
>((props, ref) => {
  return <ActionRendererWrapper {...props} forawardedRef={ref} />;
});
export default ActionButtonRenderer;
