import React, {FC} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../types';

export type navbarProps = {
  id?: string;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  color?: BaseColor;
  background?: BaseColor;
  brand?: React.ReactNode | string;
  middle?: React.ReactNode | string;
  menu?: React.ReactNode | string;
  disabled?: boolean;
  className?: string;
};

const NavbarComponent = (props: navbarProps) => {
  return (
    <div id={props.id} className={generateClass(props, 'navbar')}>
      <div className="navbar-brand-section">{props.brand}</div>
      <div className="navbar-middle-section">{props.middle}</div>
      <div className="navbar-menu-section">{props.menu}</div>
    </div>
  );
};

const Navbar: FC<navbarProps> = React.forwardRef((props) => (
  <NavbarComponent {...props} />
));
Navbar.defaultProps = {
  color: 'normal',
  background: 'normal',
  shadow: 'none',
};
export {Navbar};
