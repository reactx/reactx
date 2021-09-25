import React, {useState, useEffect, useRef, FC} from 'react';
import {generateClass} from '../types';

export type dropdownProps = {
  id?: string;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  validationStates?: 'none' | 'valid' | 'invalid';
  fixIcon?: string | React.ReactNode;
  title?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (item: dropdownItemProps) => void;
  items?: Array<dropdownItemProps>;
};

export type dropdownItemProps = {
  name: string;
  value: string;
};

const DropdownComponent = (props: dropdownProps) => {
  const [isOpen, SetOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        SetOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const renderItem = (item: dropdownItemProps) => {
    return (
      <div
        className="dropdown-item"
        onClick={(e) => {
          if (props.onChange) props.onChange(item);
          SetOpen(false);
          e.stopPropagation();
        }}>
        <span className="dropdown-value">{item.value}</span>
        <span className="dropdown-name">{item.name}</span>
      </div>
    );
  };

  return (
    <div
      ref={dropdownRef}
      id={props.id}
      title={props.title}
      className={generateClass(props, 'dropdown') + (isOpen ? ' _active' : '')}
      onClick={() => {
        !props.disabled && SetOpen(!isOpen);
      }}>
      <div className="dropdown-item">
        {props.fixIcon ? (
          <>
            {typeof props.fixIcon === 'string' ? (
              <i className={'reactx-icon nf-icon-' + props.fixIcon} />
            ) : (
              <>{props.fixIcon}</>
            )}
          </>
        ) : (
          <>
            <span className="dropdown-arrow">
              <i
                className={
                  'reactx-icon nf-icon-' +
                  (isOpen ? 'ChevronFold10' : 'ChevronUnfold10')
                }
              />
            </span>
          </>
        )}
      </div>
      <div className="dropdown-dropdown">
        {props.items &&
          props.items.map((item: dropdownItemProps, index: number) => {
            if (item.value === 'separator') return <hr key={index} />;
            return renderItem(item);
          })}
      </div>
    </div>
  );
};

const Dropdown: FC<dropdownProps> = React.forwardRef((props) => (
  <DropdownComponent {...props} />
));

Dropdown.defaultProps = {
  radius: 'normal',
  size: 'medium',
  shadow: 'none',
  validationStates: 'none',
};

export {Dropdown};
