/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import clsx from 'clsx';
 import React, {forwardRef} from 'react';
 import '../assets/elements.switch.scss';
 import {SwitchVariant, Variant} from '../types';

 export interface SwitchPropsType
   extends React.InputHTMLAttributes<HTMLLabelElement> {
    variant?: SwitchVariant;
    colorVariant?: Variant;
 }
 
 const Switch = forwardRef<HTMLLabelElement, SwitchPropsType>((props, ref) => {
   const {
    className,
    children,
    variant,
    colorVariant,
    ...restProps
   } = props;
 
   return (
     <label
       role='switch'
       ref={ref}
       className={clsx(
        'x-switch',
        'x-switch--' + variant,
        'x-switch--' + colorVariant,
        className,
      )}
       {...restProps}>
        <input className="x-switch__input" type="checkbox"/>
        <span className="x-switch__span">{children}</span>
     </label>
   );
 });
 
 Switch.defaultProps = {
   variant:'rounded',
   colorVariant:'primary'
 };
 
 Switch.displayName = 'Switch';
 
 export {Switch};
 