/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, { forwardRef, } from 'react';
import { Variant } from '../types';

import '../assets/elements.range.scss';

export interface RangePropsType
    extends React.InputHTMLAttributes<HTMLInputElement> {
    colorVariant?: Variant;
    min?: number;
    max?: number;
    value?: number;
}

const Range = forwardRef<HTMLInputElement, RangePropsType>((props, ref) => {
    const {
        className,
        min,
        max,
        value,
        colorVariant,
        ...restProps
    } = props
    return (
        <div>
            <input
                type='range'
                ref={ref}
                min={min}
                max={max}
                value={value}
                className={clsx(
                    'x-range',
                    'x-range--' + colorVariant,
                    className,
                )}  {...restProps} />
        </div>
    )
})

Range.defaultProps = {
    type: 'range',
    colorVariant: 'primary',
};

Range.displayName = 'Range';

export { Range };