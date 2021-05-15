import React, {useState, FC} from 'react';

export type switchProps = {
  id?: string;
  title?: string;
  label?: string | React.ReactNode;
  checked?: boolean;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
};

const SwitchComponent = (props: switchProps) => {
  const [active, setActive] = useState(props.checked);

  return (
    <div className="reactx-switch-container" id={props.id} title={props.title}>
      <label
        className={
          'reactx-switch ' +
          (props.className || '') +
          (props.size !== 'medium' ? ' switch-size-' + props.size : '')
        }>
        <input
          checked={active}
          type="checkbox"
          onChange={() => {
            setActive(!active);
            props.onChange && props.onChange(!active);
          }}
        />
        <span
          className={
            'reactx-slider ' +
            (props.radius !== 'normal' ? ' radius-' + props.radius : '') +
            (props.shadow !== 'none' ? ' shadow-' + props.shadow : '')
          }
        />
      </label>
      <label htmlFor={props.id} className="reactx-switch-title">
        {props.label}
      </label>
    </div>
  );
};

const Switch: FC<switchProps> = React.forwardRef((props) => (
  <SwitchComponent {...props} />
));

Switch.defaultProps = {
  radius: 'normal',
  shadow: 'none',
  size: 'medium',
};

export {Switch};
