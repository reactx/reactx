import React, {useState, FC} from 'react';
import {generateClass} from '../utils';
import DatePicker, {Calendar} from 'react-datepicker2';

export type datepickerProps = {
  id?: string;
  className?: string;
  mode?: 'datepicker' | 'calendar';
  placeholder?: string;
  isGregorian?: boolean;
  timePicker?: boolean;
  persianDigits?: boolean;
  showTodayButton?: boolean;
  showToggleButton?: boolean;
  disabled?: boolean;
  inputFormat?: string;
  inputJalaaliFormat?: string;
  minDate?: string;
  maxDate?: string;
  onChange?: (date: any) => void;
};

const CalendarComponent = (props: datepickerProps) => {
  const [value, setValue] = useState();

  return (
    <>
      {props.mode === 'datepicker' ? (
        <DatePicker
          className={generateClass(props, 'datepicker') + ' reactx-input'}
          value={value}
          isGregorian={props.isGregorian}
          timePicker={props.timePicker}
          persianDigits={props.persianDigits}
          min={props.minDate}
          max={props.maxDate}
          inputFormat={props.inputFormat}
          inputJalaaliFormat={props.inputJalaaliFormat}
          onChange={(value: any) => setValue(value)}
        />
      ) : (
        <Calendar
          calendarClass={generateClass(props, 'calendar')}
          value={value}
          isGregorian={props.isGregorian}
          min={props.minDate}
          max={props.maxDate}
          inputFormat={props.inputFormat}
          inputJalaaliFormat={props.inputJalaaliFormat}
        />
      )}
    </>
  );
};

const Datepicker: FC<datepickerProps> = React.forwardRef((props) => (
  <CalendarComponent {...props} />
));

Datepicker.defaultProps = {
  mode: 'datepicker',
  isGregorian: false,
  showTodayButton: false,
};

export {Datepicker};
