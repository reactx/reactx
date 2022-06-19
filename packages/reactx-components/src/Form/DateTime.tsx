/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import clsx from 'clsx';
import * as locales from 'date-fns/locale';
import React from 'react';
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface DateTimePropsType extends ReactDatePickerProps {}

const DateTime = (props: DateTimePropsType) => {
  const {className, locale, ...restProps} = props;
  const parsedLocal = typeof locale === 'string' ? locale : locale?.code;
  typeof locale !== 'string' && registerLocale(parsedLocal!, locale!);
  const ReactDatePicker = (DatePicker as any).default || DatePicker;
  return (
    <ReactDatePicker
      locale={parsedLocal}
      className={clsx('x-form-control', className)}
      {...restProps}
    />
  );
};

DateTime.displayName = 'DateTime';
DateTime.defaultProps = {
  locale: locales.faIR,
};
export default DateTime;
