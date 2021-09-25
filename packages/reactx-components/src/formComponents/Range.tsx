import React, {FC} from 'react';
import {generateClass} from '../types';

const randomNumber = 'range-' + Math.ceil(Math.random() * 1000);

export type rangeProps = {
  id?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
  formControlStyle?: 'normal' | 'inline';
  label?: string;
  value?: string;
  title?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RangeComponent = (props: rangeProps) => {
  return (
    <div
      className={
        'reactx-form-control' +
        (props.formControlStyle !== 'normal'
          ? ' form-range-' + props.formControlStyle
          : '') +
        (props.size !== 'medium' ? ' range-size-' + props.size : '')
      }>
      {props.label && (
        <>
          {typeof props.label === 'string' ? (
            <label htmlFor={props.id} className="control-label">
              {props.label}
              {props.required && <span className="reactx-color-danger">*</span>}
            </label>
          ) : (
            <>{props.label}</>
          )}
        </>
      )}
      <input
        type="range"
        className={generateClass(props, 'range')}
        id={props.id}
        title={props.title}
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={() => props.onChange && props.onChange}
      />
    </div>
  );
};

const Range: FC<rangeProps> = React.forwardRef((props) => (
  <RangeComponent {...props} />
));

Range.defaultProps = {
  id: randomNumber,
  size: 'medium',
  formControlStyle: 'normal',
  min: 0,
  max: 100,
  step: 1,
};

export {Range};
