import React, {FC, useState} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type toggleButtonProps = {
  id?: string;
  size?: 'small' | 'medium' | 'large' | 'extra';
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill' | 'rounded';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode | string;
  toggleChildren: React.ReactNode | string;
  title?: string;
  outline?: boolean;
  disabled?: boolean;
  toggle: boolean;
  className?: string;
  onClick: (toggle: boolean) => void;
};

const ToggleButtonComponent = (props: toggleButtonProps) => {
  const [toggle, SetToggle] = useState<boolean>(props.toggle);

  return (
    <button
      id={props.id}
      title={props.title}
      data-toggle={toggle}
      disabled={props.disabled}
      className={generateClass(props, 'btn')}
      onClick={() => {
        SetToggle(!toggle);
        props.onClick(!toggle);
      }}>
      {props.toggleChildren && toggle ? props.toggleChildren : props.children}
    </button>
  );
};

const ToggleButton: FC<toggleButtonProps> = React.forwardRef((props) => (
  <ToggleButtonComponent {...props} />
));
ToggleButton.defaultProps = {
  radius: 'normal',
  shadow: 'none',
  color: 'normal',
  size: 'medium',
};
export {ToggleButton};
