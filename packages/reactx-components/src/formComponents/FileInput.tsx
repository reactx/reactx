import React, {FC} from 'react';
import {generateClass} from '../utils';

export type fileInputProps = {
  id?: string;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  size?: 'small' | 'medium' | 'large' | 'extra';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  validationStates?: 'none' | 'valid' | 'invalid';
  format?: 'audio' | 'video' | 'image';
  title?: string;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInputComponent = (props: fileInputProps) => {
  return (
    <div className="reactx-form-control">
      <label htmlFor={props.id} className="control-label">
        {props.label}
        {props.required && <span className="reactx-color-danger">*</span>}
      </label>
      <input
        id={props.id}
        title={props.title}
        required={props.required}
        disabled={props.disabled}
        multiple={props.multiple}
        accept={props.format + '/*'}
        type="file"
        className={generateClass(props, 'input')}
        onChange={() => props.onChange && props.onChange}
      />
    </div>
  );
};

const FileInput: FC<fileInputProps> = React.forwardRef((props) => (
  <FileInputComponent {...props} />
));

FileInput.defaultProps = {
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
  validationStates: 'none',
};

export {FileInput};
