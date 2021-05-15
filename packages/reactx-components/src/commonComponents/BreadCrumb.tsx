import React, {FC} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type breadCrumbProps = {
  id?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  icon?: string;
  items: Array<itemsProps>;
  onClick?: (item: itemsProps) => void;
  stepMode?: boolean;
  itemIcon?: boolean;
};

export type itemsProps = {
  title: string;
  id: string;
  icon: string;
  active: boolean;
};

const BreadCrumbComponent = (props: breadCrumbProps) => {
  return (
    <div
      id={props.id}
      className={
        generateClass(props, 'breadcrumb') + (props.stepMode ? ' step' : '')
      }>
      {props.items.map((item, index) => {
        return (
          <>
            {index !== 0 && (
              <i className={'reactx-icon nf-icon-' + props.icon} />
            )}
            <div
              className={'breadcrumb-item' + (item.active ? ' active' : '')}
              key={index}
              onClick={() => {
                props.onClick && props.onClick(item);
              }}>
              {props.itemIcon && (
                <span className="bread-icon">
                  <i className={'reactx-icon nf-icon-' + item.icon} />
                </span>
              )}
              <span className="bread-title" title={item.title}>
                {item.title}
              </span>
            </div>
          </>
        );
      })}
    </div>
  );
};

const BreadCrumb: FC<breadCrumbProps> = React.forwardRef((props) => (
  <BreadCrumbComponent {...props} />
));

BreadCrumb.defaultProps = {
  color: BaseColor.normal,
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
  icon: 'ChevronRight',
};
export {BreadCrumb};
