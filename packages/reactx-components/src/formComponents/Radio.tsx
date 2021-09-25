import React, {useState, FC} from 'react';
import {generateClass} from '../types';

export type radioProps = {
  id?: string;
  size?: 'small' | 'medium' | 'large' | 'extra';
  label?: string | React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (check: boolean) => void;
};

const RadioComponent = (props: radioProps) => {
  const [check, setCheck] = useState(props.checked || false);

  return (
    <div
      id={props.id}
      className={
        generateClass(props, 'radio') + (props.checked ? ' checked' : '')
      }
      onClick={() => {
        setCheck(!check);
        if (props.onChange) props.onChange(!check);
      }}>
      <div className="radio">
        <i className={'reactx-radio-check ' + (check ? 'on' : '')} />
      </div>
      <label htmlFor={props.id} className="radio-title">
        {props.label}
      </label>
    </div>
  );
};

const Radio: FC<radioProps> = React.forwardRef((props) => (
  <RadioComponent {...props} />
));

Radio.defaultProps = {
  size: 'medium',
};

export {Radio};
