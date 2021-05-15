import React, {FC, useState} from 'react';
import {generateClass} from '../utils';

export type checkBoxProps = {
  id?: string;
  size?: 'small' | 'medium' | 'large' | 'extra';
  label?: string | React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (check: boolean) => void;
};

const CheckBoxComponent = (props: checkBoxProps) => {
  const [check, setCheck] = useState(props.checked || false);

  return (
    <div
      id={props.id}
      className={generateClass(props, 'checkbox') + (check ? ' checked' : '')}
      onClick={() => {
        setCheck(!check);
        if (props.onChange) props.onChange(!check);
      }}>
      <div className="checkbox">
        <i className={'reactx-checkbox-check ' + (check ? 'on' : '')} />
      </div>
      <label htmlFor={props.id} className="checkbox-title">
        {props.label}
      </label>
    </div>
  );
};

const CheckBox: FC<checkBoxProps> = React.forwardRef((props) => (
  <CheckBoxComponent {...props} />
));

CheckBox.defaultProps = {
  size: 'medium',
};
export {CheckBox};
