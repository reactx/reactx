import React, {FC} from 'react';
import {generateClass} from '../utils';

const randomNumber = 'input-' + Math.ceil(Math.random() * 1000);

export type inputTextProps = {
  id?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'search'
    | 'color'
    | 'hidden'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'month'
    | 'week';
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  formControlStyle?: 'normal' | 'inline';
  validationStates?: 'none' | 'valid' | 'invalid';
  prepend?: React.ReactNode | string;
  append?: React.ReactNode | string;
  label?: string;
  description?: string;
  validMessage?: string;
  invalidMessage?: string;
  value?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  spellcheck?: boolean;
  autoFocus?: boolean;
  className?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiLine?: boolean;
};

const InputTextComponent = (props: inputTextProps) => {
  return (
    <div
      className={
        'reactx-form-control' +
        (props.formControlStyle !== 'normal'
          ? ' form-control-' + props.formControlStyle
          : '') +
        (props.size !== 'medium' ? ' form-control-' + props.size : '')
      }>
      {props.type !== 'hidden' && props.label && (
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
      <div className={generateClass(props, 'input-container')}>
        {props.prepend && (
          <div className="control-prepend">{props.prepend}</div>
        )}
        {props.multiLine ? (
          <textarea
            className={generateClass(props, 'input')}
            id={props.id}
            title={props.title}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
            autoFocus={props.autoFocus}
            spellCheck={props.spellcheck}
            minLength={props.minLength}
            maxLength={props.maxLength}
            onChange={() => props.onChange && props.onChange}></textarea>
        ) : (
          <input
            className={generateClass(props, 'input')}
            id={props.id}
            title={props.title}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
            autoFocus={props.autoFocus}
            spellCheck={props.spellcheck}
            minLength={props.minLength}
            maxLength={props.maxLength}
            pattern={props.pattern}
            onChange={() => props.onChange && props.onChange}
          />
        )}
        {props.append && <div className="control-append">{props.append}</div>}
      </div>
      {props.type !== 'hidden' && props.description && (
        <div className="control-description">{props.description}</div>
      )}
      {props.type !== 'hidden' && props.validationStates === 'valid' && (
        <div className="valid-feedback">{props.validMessage}</div>
      )}
      {props.type !== 'hidden' && props.validationStates === 'invalid' && (
        <div className="invalid-feedback">{props.invalidMessage}</div>
      )}
    </div>
  );
};

const InputText: FC<inputTextProps> = React.forwardRef((props) => (
  <InputTextComponent {...props} />
));

InputText.defaultProps = {
  id: randomNumber,
  type: 'text',
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
  validationStates: 'none',
  formControlStyle: 'normal',
};

export {InputText};
