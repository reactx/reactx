import React, {FC} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type listProps = {
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  items: Array<listItems>;
  className?: string;
  onClick?: (item: listItems) => void;
  id?: string;
};

export type listItems = {
  id: string;
  data: React.ReactNode | string;
};

const ListComponent = (props: listProps) => {
  return (
    <ul id={props.id} className={generateClass(props, 'list')}>
      {props.items.map((item: listItems, index) => (
        <li
          key={index}
          id={item.id}
          className="list-item"
          onClick={() => {
            props.onClick && props.onClick(item);
          }}>
          {item.data}
        </li>
      ))}
    </ul>
  );
};

const List: FC<listProps> = React.forwardRef((props) => (
  <ListComponent {...props} />
));
List.defaultProps = {
  radius: 'normal',
  shadow: 'none',
  color: BaseColor.normal,
};
export {List};
