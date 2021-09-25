import React, {FC} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../types';

export type tableProps = {
  id?: string;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'rounded' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  color?: BaseColor;
  header: Array<string>;
  body: Array<any>;
  footer?: React.ReactNode | string;
  className?: string;
};

const TableComponent = (props: tableProps) => {
  return (
    <div id={props.id} className={generateClass(props, 'table')}>
      <div className="table-header">
        {props.header.map((item, index) => (
          <div key={index} className="table-header-item">
            {item}
          </div>
        ))}
      </div>
      <div className="table-body">
        {props.body.map((record: any, recIndex: number) => (
          <div className="table-row" key={recIndex}>
            {props.header.map((item: any, index) => (
              <div key={index} className="table-row-item">
                {record[item]}
              </div>
            ))}
          </div>
        ))}
      </div>
      {props.footer && <div className="table-footer">{props.footer}</div>}
    </div>
  );
};

const Table: FC<tableProps> = React.forwardRef((props) => (
  <TableComponent {...props} />
));
Table.defaultProps = {
  color: 'normal',
  radius: 'normal',
  shadow: 'none',
};
export {Table};
