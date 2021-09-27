/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef, forwardRef} from 'react';
import {CSSTransition} from 'react-transition-group';

export interface ModalPropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<CSSTransition<HTMLElement | undefined>>;
  show: boolean;
  backdrop?: boolean;
  backdropClassName?: string;
  closeDelay?: number;
  onShow?: () => {};
  onHide?: () => {};
}

const ModalComponent = (props: ModalPropsType) => {
  const {
    forawardedRef,
    className,
    show,
    backdrop,
    backdropClassName,
    closeDelay,
    onShow,
    onHide,
    children,
    ...restProps
  } = props;

  return (
    <>
      {backdrop && (
        <div
          className={classNames('x-modal-backdrop', backdropClassName)}
          onClick={onHide ? onHide : undefined}></div>
      )}
      <CSSTransition
        ref={forawardedRef}
        unmountOnExit
        in={show}
        classNames="x-modal-container"
        timeout={closeDelay!}>
        <div className={classNames(className)} {...restProps}>
          {children}
        </div>
      </CSSTransition>
    </>
  );
};

const Modal: FC<ModalPropsType> = forwardRef<
  CSSTransition<HTMLElement | undefined>,
  ModalPropsType
>((props, forawardedRef) => {
  return <ModalComponent {...props} forawardedRef={forawardedRef} />;
});

Modal.displayName = 'Modal';
Modal.defaultProps = {
  closeDelay: 300,
  backdrop: true,
  show: false,
};
export {Modal};
