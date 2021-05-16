import React, {FC, useEffect} from 'react';
import {generateClass} from '../utils';
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu,
} from 'react-contextmenu';

export type menuProps = {
  id: string;
  className: string;
  items: Array<menuItems>;
  icon: boolean;
  shortcutKey: boolean;
  rtl: boolean;
  color?: string;
  background?: string;
  radius?: 'none' | 'small' | 'normal' | 'curve';
  shadow?: 'none' | 'small' | 'medium' | 'large';
};

export type menuItems = {
  hasDevider: boolean;
  children: Array<any>;
  icon: string;
  text: string;
  shortcut: string;
  data: string;
};

const MenuComponent = (props: menuProps) => {
  let menuProps = {...props};
  delete menuProps.background;
  delete menuProps.color;

  useEffect(() => {
    if (props.background) {
      let menuList = document.querySelectorAll('.react-contextmenu');
      menuList.forEach((menu: any) => {
        menu.style.backgroundColor = props.background;
        menu.style.color = props.color;
      });
    }
  }, [props.background]);

  return (
    <div className={props.rtl ? 'reactx-rtl' : ''}>
      <ContextMenuTrigger id={props.id}>
        <div>Right click to see the menu</div>
      </ContextMenuTrigger>
      <ContextMenu id={props.id} className={generateClass(menuProps, 'menu')}>
        {props.items.map((item, index) => (
          <>
            {!item.children.length ? (
              <MenuItem key={index} data={item.data}>
                <span className="reactx-menu-item-title">
                  {props.icon && <i className={'reactx-icon ' + item.icon} />}
                  {item.text}
                </span>
                {props.shortcutKey && (
                  <span className="reactx-menu-short-key">{item.shortcut}</span>
                )}
              </MenuItem>
            ) : (
              <SubMenu
                className={generateClass(menuProps, 'sub-menu')}
                title={
                  <>
                    <span
                      className={'reactx-menu-item-title'}
                      style={{color: props.color}}>
                      {props.icon && (
                        <i className={'reactx-icon ' + item.icon} />
                      )}
                      {item.text}
                    </span>
                    {props.shortcutKey && (
                      <span className="reactx-menu-short-key">
                        {item.shortcut}
                      </span>
                    )}

                    {props.rtl ? (
                      <i className={'reactx-icon nf-icon-FlickRight'}></i>
                    ) : (
                      <i className={'reactx-icon nf-icon-FlickLeft'}></i>
                    )}
                  </>
                }>
                {item.children.map((subItem, i) => (
                  <MenuItem key={i} data={subItem.data}>
                    <span className="reactx-menu-item-title">
                      {props.icon && (
                        <i className={'reactx-icon ' + subItem.icon} />
                      )}
                      {subItem.text}
                      {props.shortcutKey && (
                        <span className="reactx-menu-short-key">
                          {subItem.shortcut}
                        </span>
                      )}
                    </span>
                  </MenuItem>
                ))}
              </SubMenu>
            )}
            {item.hasDevider && <MenuItem divider />}
          </>
        ))}
      </ContextMenu>
    </div>
  );
};

const Menu: FC<menuProps> = React.forwardRef((props) => (
  <MenuComponent {...props} />
));
Menu.defaultProps = {
  radius: 'none',
  shadow: 'none',
  icon: true,
  shortcutKey: true,
};
export {Menu};
