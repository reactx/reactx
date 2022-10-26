/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import clsx from 'clsx';
import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {CSSTransition} from 'react-transition-group';
import '../assets/elements.wizard.scss';
import {typeOfComponent} from '../types';
import Step from './Step';

export type StepsType = {
  name: string;
  id: number;
  child: React.ReactNode;
};
export interface WizardPropsType
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  renderLine?:
    | boolean
    | ((steps: Array<StepsType>, activeStep?: number) => React.ReactNode);
  children: React.ReactElement | React.ReactElement[];
  activeStep?: number;
  animationDelay?: number;
  unmountOnExit?: boolean;
}

const Wizard = forwardRef<HTMLDivElement, WizardPropsType>((props, ref) => {
  const {
    className,
    children,
    activeStep,
    animationDelay,
    unmountOnExit,
    renderLine,
    ...restProps
  } = props;

  const prevStep = useRef<number>(activeStep || 0);

  useEffect(() => {
    prevStep.current = activeStep!;
  }, [activeStep]);

  const steps = useMemo(() => {
    return React.Children.map(
      React.Children.toArray(children).filter(
        (child) => typeOfComponent(child) === 'Step',
      ) as Array<ReactElement>,
      (child, index) => {
        return {
          name: (child.props && child.props.name) || `step${index}`,
          id: index,
          child,
        };
      },
    );
  }, [children]);

  return (
    <div ref={ref} className={clsx('x-wizard', className)} {...restProps}>
      {renderLine &&
        (typeof renderLine === 'boolean' ? (
          <div className='x-wizard__line'>
            <span className='x-wizard__line-title'>
              {steps.find((c) => c.id === activeStep)?.name}
            </span>
            <ul className='x-wizard__line-steps'>
              {steps.map((step) => {
                return (
                  <li
                    className={clsx('x-wizard__line-step', {
                      'x-wizard__line-step--active': step.id === activeStep,
                    })}
                    key={step.id}></li>
                );
              })}
            </ul>
          </div>
        ) : (
          renderLine(steps, activeStep)
        ))}
      {steps.map((step) => {
        return (
          <CSSTransition
            key={step.id}
            in={step.id === activeStep}
            clsx={
              'x-wizard__step ' +
              (prevStep.current > activeStep!
                ? 'x-wizard__step--prev'
                : 'x-wizard__step--next')
            }
            unmountOnExit={unmountOnExit}
            timeout={animationDelay!}>
            {step.child}
          </CSSTransition>
        );
      })}
    </div>
  );
});

Wizard.defaultProps = {
  animationDelay: 300,
  activeStep: 0,
  unmountOnExit: true,
};
Wizard.displayName = 'Wizard';
export default Object.assign(Wizard, {
  Step,
});
