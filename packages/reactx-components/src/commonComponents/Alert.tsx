import React, {FC, MouseEventHandler} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type alertProps = {
  id?: string;
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  title?: string;
  outline?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  children: React.ReactNode | string;
};

const AlertComponent = (props: alertProps) => {
  return (
    <div
      id={props.id}
      title={props.title}
      onClick={props.onClick}
      className={generateClass(props, 'alert')}>
      {props.children}
    </div>
  );
};

const Alert: FC<alertProps> = React.forwardRef((props) => (
  <AlertComponent {...props} />
));

Alert.defaultProps = {
  color: 'normal',
  radius: 'normal',
  shadow: 'none',
};
export {Alert};
