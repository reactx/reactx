import React, {FC, MouseEventHandler} from 'react';
import {BaseColor} from '../../inline-typed';
import {Progress} from '../formComponents/Progress';
import {generateClass} from '../types';
import {FluentIcon} from './FluentIcon';

export type toastProps = {
  header?: React.ReactNode | string;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  color?: BaseColor;
  icon: string;
  useDefaultIcon?: boolean;
  showDuration?: number;
  className?: string;
  closeAction?: MouseEventHandler;
  progressBar?: boolean;
  onClick?: void;
  outline?: boolean;
  id?: string;
  children: React.ReactNode | string;
};

const ToastComponent = (props: toastProps) => {
  return (
    <div id={props.id} className={generateClass(props, 'toast')}>
      {props.header && (
        <div className="toast-header">
          <div>{props.header}</div>
          <FluentIcon
            icon="ChromeClose"
            radius="rounded"
            iconSize="tiny"
            onClick={props.closeAction}
          />
        </div>
      )}
      <div className="toast-body">
        {props.useDefaultIcon && (
          <FluentIcon
            icon={props.icon}
            radius="rounded"
            iconSize="extra-large"
          />
        )}
        {props.children}
      </div>
      {props.progressBar && (
        <Progress
          value={10}
          size="tiny"
          radius="none"
          max={100}
          color={props.color}
        />
      )}
    </div>
  );
};

const Toast: FC<toastProps> = React.forwardRef((props) => (
  <ToastComponent {...props} />
));
Toast.defaultProps = {
  radius: 'small',
  shadow: 'small',
  color: 'normal',
  showDuration: 3000,
};
export {Toast};
