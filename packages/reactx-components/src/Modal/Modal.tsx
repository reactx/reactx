/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import '../assets/elements.modal.scss';
import {CloseButton} from '../CloseButton/CloseButton';

export interface ModalPropsType extends React.HTMLAttributes<HTMLDivElement> {
  forawardedRef?: ForwardedRef<CSSTransition<HTMLElement | undefined>>;
  show: boolean;
  width?: number | string;
  backdrop?: boolean;
  backdropClassName?: string;
  closeDelay?: number;
  onShow?: () => void;
  onHide?: () => void;
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
    title,
    width,
    ...restProps
  } = props;

  return (
    <>
      {backdrop && show && (
        <div
          className={classNames('x-modal__backdrop', backdropClassName)}
          onClick={onHide ? onHide : undefined}></div>
      )}
      <CSSTransition
        ref={forawardedRef}
        unmountOnExit
        in={show}
        classNames="x-modal"
        timeout={closeDelay!}>
        <div
          style={{width: width}}
          className={classNames('x-modal', className)}
          {...restProps}>
          {title && (
            <div className="x-modal__header">
              <div className="x-modal__header-title">{title}</div>
              <CloseButton onClick={onHide ? onHide : undefined}></CloseButton>
            </div>
          )}
          {children}
        </div>
      </CSSTransition>
    </>
  );
};

const Modal = forwardRef<
  CSSTransition<HTMLElement | undefined>,
  ModalPropsType
>((props, ref) => {
  return <ModalComponent {...props} forawardedRef={ref} />;
});

Modal.displayName = 'Modal';
Modal.defaultProps = {
  closeDelay: 1,
  backdrop: true,
  show: false,
};
export {Modal};
