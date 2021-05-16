import React, {FC, useState} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type bottomNavigationProps = {
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  default: string;
  onClick?: (id: string) => void;
  items: Array<itemsProps>;
  label?: boolean;
  id?: string;
};

export type itemsProps = {
  title: string;
  id: string;
  icon: string;
};

const BottomNavigationComponent = (props: bottomNavigationProps) => {
  const [active, setActive] = useState<string>(props.default);

  return (
    <div id={props.id} className={generateClass(props, 'btm-navigation')}>
      {props.items.map((item: itemsProps, index: number) => (
        <div
          key={index}
          className={'btm-nav-item' + (active === item.id ? ' active' : '')}
          title={item.title}
          onClick={() => {
            setActive(item.id);
            if (props.onClick) props.onClick(item.id);
          }}>
          <div className="btm-nav-icon">
            <i className={'reactx-icon nf-icon-' + item.icon} />
          </div>
          {props.label && <div className="btm-nav-title">{item.title}</div>}
        </div>
      ))}
    </div>
  );
};

const BottomNavigation: FC<bottomNavigationProps> = React.forwardRef(
  (props) => <BottomNavigationComponent {...props} />,
);
BottomNavigation.defaultProps = {
  radius: 'normal',
  color: 'normal',
  shadow: 'none',
};
export {BottomNavigation};
