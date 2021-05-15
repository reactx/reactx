import React, {FC} from 'react';
import {BaseColor, LoadingSizeType} from '../../inline-typed';
import {generateClass} from '../utils';
import {Loading} from './Loading';

export type avatarProps = {
  id?: string;
  size?: LoadingSizeType;
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  outline?: boolean;
  username: string;
  src?: string;
  title?: string;
  disabled?: boolean;
  letterCount: number;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
};

const AvatarComponent = (props: avatarProps) => {
  return (
    <div
      id={props.id}
      title={props.title || props.username}
      className={generateClass(props, 'avatar')}
      onClick={() => props.onClick && props.onClick()}>
      {props.src ? (
        <img src={props.src} alt={props.username} />
      ) : (
        <span className="reactx-avatar-letter">
          {props.username
            .substring(0, props.letterCount)
            .trim()
            .replace(/^\w/, (c) => c.toUpperCase())}
        </span>
      )}
      {props.loading && (
        <Loading
          enabled={props.loading}
          color={props.color}
          size={props.size}
        />
      )}
    </div>
  );
};

const Avatar: FC<avatarProps> = React.forwardRef((props) => (
  <AvatarComponent {...props} />
));
Avatar.defaultProps = {
  color: BaseColor.normal,
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
  letterCount: 1,
};
export {Avatar};
