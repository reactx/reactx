import React, {FC, useState} from 'react';
import {generateClass} from '../utils';
import {FluentIcon} from './FluentIcon';

export type paginationProps = {
  id?: string;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'rounded' | 'pill';
  items: Array<number>;
  disabled?: boolean;
  className?: string;
  changePagePosition: (item: number) => void;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
};

const PaginationComponent = (props: paginationProps) => {
  const [active, setActive] = useState<number>(0);

  const changePagePosition = (item: number) => {
    setActive(item);
    props.changePagePosition(item);
  };

  let output = [...props.items];
  if (output.length > 5) {
    if (active < 5) {
      output = output.slice(0, 5);
    } else {
      if (active + 5 >= props.items.length) {
        let m = active + 5 - props.items.length;
        output = output.slice(active - m, active - m + 5);
      } else {
        output = output.slice(active, active + 5);
      }
    }
  }

  return (
    <div className="reactx-pagination-container">
      <FluentIcon
        icon="DoubleChevronLeft"
        shadowOnHover="small"
        radius={props.radius}
        iconSize={props.size}
        onClick={() => changePagePosition(0)}
        disabled={active === 0}
      />

      <FluentIcon
        icon="ChevronLeft"
        shadowOnHover="small"
        radius={props.radius}
        iconSize={props.size}
        onClick={() => changePagePosition(active - 1)}
        disabled={active === 0}
      />
      <ul id={props.id} className={generateClass(props, 'pagination')}>
        {output.map((item: number) => (
          <li
            key={item}
            onClick={() => changePagePosition(item - 1)}
            className={
              'pagination-item ' + (item === active + 1 ? 'active' : '')
            }>
            {item}
          </li>
        ))}
      </ul>
      <FluentIcon
        icon="ChevronRight"
        shadowOnHover="small"
        radius={props.radius}
        iconSize={props.size}
        onClick={() => changePagePosition(active + 1)}
        disabled={active + 1 === props.items.length}
      />
    </div>
  );
};

const Pagination: FC<paginationProps> = React.forwardRef((props) => (
  <PaginationComponent {...props} />
));
Pagination.defaultProps = {
  radius: 'normal',
  size: 'medium',
};
export {Pagination};
