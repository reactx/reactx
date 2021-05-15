import React, {FC, useState} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type collapseProps = {
  head: React.ReactNode | string;
  onClick?: (id: string) => void;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'rounded' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  color?: BaseColor;
  accordionMode?: boolean;
  className?: string;
  disabled?: boolean;
  title?: string;
  open?: boolean;
  id: string;
  children: React.ReactNode | string;
};

const CollapseComponent = (props: collapseProps) => {
  const [open, setOpen] = useState<boolean>(props.accordionMode ? false : true);

  const clickAction = () => {
    if (!props.accordionMode) {
      setOpen(!open);
    }
    if (props.onClick) props.onClick(props.id);
  };

  return (
    <div
      id={props.id}
      title={props.title}
      className={generateClass(props, 'collapse')}>
      <div className="collapse-title" onClick={() => clickAction()}>
        {props.head}
      </div>
      <div
        className={
          'collapse-data' +
          (open || (props.accordionMode && props.open) ? ' collapsed' : '')
        }>
        {props.children}
      </div>
    </div>
  );
};

const Collapse: FC<collapseProps> = React.forwardRef((props: collapseProps) => (
  <CollapseComponent {...props} />
));
Collapse.defaultProps = {
  radius: 'normal',
  color: BaseColor.normal,
  shadow: 'none',
};

export {Collapse};
