/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import * as locales from 'date-fns/locale';
import React, {FC} from 'react';
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';

export interface DateTimePropsType extends ReactDatePickerProps {}

const DateTime: FC<DateTimePropsType> = (props: DateTimePropsType) => {
  const {className, locale, ...restProps} = props;
  const parsedLocal = typeof locale === 'string' ? locale : locale?.code;
  typeof locale !== 'string' && registerLocale(parsedLocal!, locale!);
  return (
    <DatePicker
      locale={parsedLocal}
      className={classNames('x-form-control', className)}
      {...restProps}
    />
  );
};

DateTime.displayName = 'DateTime';
DateTime.defaultProps = {
  locale: locales.faIR,
};
export default DateTime;
