import React, {FC, useEffect, useRef} from 'react';
import {BaseColor} from '../../inline-typed';
import {FluentIcon} from './FluentIcon';

export type modalProps = {
  id?: string;
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  modalType?: 'full' | 'left' | 'right' | 'bottom';
  header?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  closeBtn?: boolean;
  backdrop?: boolean;
  show: boolean;
  backdropClose?: boolean;
  className?: string;
  closeAction?: (show: boolean) => void;
  children: React.ReactNode | string;
};

const ModalComponent = (props: modalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.show) return;
    if (!props.backdropClose) return;
    const handleClickOutside = (event: Event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        props.closeAction
      ) {
        props.closeAction(!props.show);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div
      className={
        'reactx-modal-container' +
        (props.backdrop && props.show ? ' modal-backdrop' : '')
      }>
      <div
        id={props.id}
        className={
          (props.show ? 'modal-wrapper-active ' : '') +
          'modal-wrapper ' +
          (props.className || '') +
          ('modal-' + props.modalType) +
          (props.color ? ' reactx-modal-' + props.color : '') +
          (props.radius !== 'normal' ? ' radius-' + props.radius : '') +
          (props.shadow !== 'medium' ? ' shadow-' + props.shadow : '')
        }
        ref={modalRef}>
        {props.header && (
          <div className="modal-header">
            <div className="modal-title">{props.header}</div>
            {props.closeBtn && (
              <div className="modal-btn">
                <button
                  className="close-btn"
                  aria-label="close"
                  onClick={() => {
                    props.closeAction;
                  }}>
                  <FluentIcon
                    icon="CalculatorMultiply"
                    color="#fff"
                    iconSize="tiny"
                    className="reactx-p-0"
                  />
                </button>
              </div>
            )}
          </div>
        )}
        <div className="modal-body">{props.children}</div>
        {props.footer && <div className="modal-footer">{props.footer}</div>}
      </div>
    </div>
  );
};

const Modal: FC<modalProps> = React.forwardRef((props) => (
  <ModalComponent {...props} />
));
Modal.defaultProps = {
  modalType: 'full',
  color: BaseColor.normal,
  radius: 'normal',
  shadow: 'medium',
  show: true,
};
export {Modal};
