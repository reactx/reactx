import React, {FC, useState} from 'react';

export type floatActionProps = {
  direction: 'vertical' | 'horizontal';
  position: 'top' | 'bottom';
  float: 'right' | 'left' | 'center';
  subChildren: Array<floatActionItems>;
  className?: string;
  onClick?: (item: floatActionItems) => void;
  id?: string;
  children: React.ReactNode | string;
};

export type floatActionItems = {
  props: {
    id: string;
    className: string;
  };
  data: string;
};

const FloatActionComponent = (props: floatActionProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div
      id={props.id}
      className={
        'reactx-float-action' +
        (toggle ? ' toggle' : '') +
        (props.className ? ' ' + props.className : '') +
        ' ' +
        props.direction +
        ' ' +
        props.position +
        ' ' +
        props.float
      }>
      <div className="main-action" onClick={() => setToggle(!toggle)}>
        {props.children}
      </div>
      <div className="sub-action">
        {props.subChildren.length !== 0 && (
          <>
            {props.subChildren.map((item: floatActionItems, index: number) => (
              <div
                {...item.props}
                className={
                  'sub-action-item ' +
                  (item.props.className ? item.props.className : '')
                }
                onClick={() => {
                  props.onClick && props.onClick(item);
                }}
                key={index}>
                {item.data}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const FloatAction: FC<floatActionProps> = React.forwardRef((props) => (
  <FloatActionComponent {...props} />
));
FloatAction.defaultProps = {
  direction: 'vertical',
  position: 'bottom',
  float: 'right',
};
export {FloatAction};
