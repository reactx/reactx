import React, {useState, useEffect, useRef, FC} from 'react';
import {generateClass} from '../types';

export type selectBoxProps = {
  id?: string;
  title?: string;
  className?: string;
  items?: Array<any>;
  defaultValue?: string;
  defaultText?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  multiple?: boolean;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  validationStates?: 'none' | 'valid' | 'invalid';
};

const SelectBoxComponent = (props: selectBoxProps) => {
  const selectboxRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (props.defaultValue && props.items) {
      let index = props.items.findIndex(
        (item) => item.value === props.defaultValue,
      );
      setSelectedIndex(index);
    }
  }, [props.defaultValue, props.items]);

  return (
    <select
      ref={selectboxRef}
      id={props.id}
      title={props.title}
      disabled={props.disabled}
      required={props.required}
      autoFocus={props.autoFocus}
      multiple={props.multiple}
      className={generateClass(props, 'selectbox')}
      onChange={() => props.onChange && props.onChange}>
      <option value="" className="selectbox-item">
        {props.defaultText}
      </option>
      {props.items &&
        props.items.map((item: any, index: number) => (
          <option
            key={index}
            value={item.value}
            selected={selectedIndex === index ? true : false}
            className="selectbox-item">
            {item.name}
          </option>
        ))}
    </select>
  );
};

const SelectBox: FC<selectBoxProps> = React.forwardRef((props) => (
  <SelectBoxComponent {...props} />
));

SelectBox.defaultProps = {
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
  validationStates: 'none',
  defaultText: '--Please choose an option--',
};

export {SelectBox};
