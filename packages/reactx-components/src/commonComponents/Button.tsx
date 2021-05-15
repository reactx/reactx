import React, {FC} from 'react';
import {BaseColor, LoadingSizeType} from '../../inline-typed';
import {generateClass} from '../utils';
import {Loading} from './Loading';

export type buttonProps = {
  id?: string;
  type: 'button' | 'reset' | 'submit';
  size?: LoadingSizeType;
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill' | 'rounded';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  title?: string;
  outline?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick: () => void;
  children: React.ReactNode | string;
};

const ButtonComponent = (props: buttonProps) => {
  return (
    <button
      id={props.id}
      title={props.title}
      disabled={props.disabled}
      onClick={() => props.onClick()}
      className={generateClass(props, 'btn')}>
      {props.children}
      <Loading enabled={props.loading} color={props.color} size={props.size} />
    </button>
  );
};

const Button: FC<buttonProps> = React.forwardRef((props) => (
  <ButtonComponent {...props} />
));
Button.defaultProps = {
  type: 'button',
  color: BaseColor.normal,
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
};
export {Button};
