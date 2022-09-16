/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, { forwardRef } from 'react';

import '../assets/elements.accordion.scss';
import { AccordionVariant, Variant } from '../types';


export interface AccordionPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: AccordionVariant;
  colorVariant?: Variant;
  label?: React.ReactNode;
  name: string;
  id?: string;
}

const Accordion = forwardRef<HTMLInputElement, AccordionPropsType>((props, ref) => {
  const { className, variant, colorVariant, label, id,name, children, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={clsx(
        'x-accordion',
        'x-accordion' + colorVariant,
        className,
      )}
      {...restProps}>
      <input
        className='x-accordion__input'
        name={name}
        type={variant}
        id={id} />
      <label
        className='x-accordion__label'
        htmlFor={id}>{label}</label>
      <div className='x-accordion__content'>
        {children}
      </div>
    </div>
  )
})

Accordion.displayName = 'Accordion';
export default Accordion;