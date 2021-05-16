import React, {FC} from 'react';

export type columnProps = {
  id?: string;
  children: string | React.ReactNode;
  size?:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | 'auto';
  sizeMd?:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | 'auto';
  sizeLg?:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | 'auto';
  className?: string;
};

const ColumnComponent = (props: columnProps) => {
  return (
    <div
      id={props.id}
      className={
        'reactx-column ' +
        (props.size ? 'col-' + props.size : '') +
        (props.sizeMd ? ' col-md-' + props.sizeMd : '') +
        (props.sizeLg ? ' col-lg-' + props.sizeLg : '') +
        (' ' + props.className || '')
      }>
      {props.children}
    </div>
  );
};

const Column: FC<columnProps> = React.forwardRef((props) => (
  <ColumnComponent {...props} />
));
Column.defaultProps = {
  className: '',
  size: '12',
};

export {Column};
