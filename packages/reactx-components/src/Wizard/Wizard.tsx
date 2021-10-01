/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {ForwardedRef, forwardRef, ReactElement, useMemo} from 'react';
import {CSSTransition} from 'react-transition-group';
import {typeOfComponent} from '../types';
import Step from './Step';
import '../assets/elements.wizard.scss';

export type StepsType = {
  name: string;
  id: number;
  child: React.ReactNode;
};
export interface WizardPropsType
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  renderLine?:
    | boolean
    | ((steps: Array<StepsType>, activeStep?: number) => React.ReactNode);
  children: React.ReactElement | React.ReactElement[];
  activeStep?: number;
  animationDelay?: number;
  unmountOnExit?: boolean;
}

const WizardComponent = (props: WizardPropsType) => {
  const {
    forawardedRef,
    className,
    children,
    activeStep,
    animationDelay,
    unmountOnExit,
    renderLine,
    ...restProps
  } = props;
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
    <div
      ref={forawardedRef}
      className={classNames('x-wizard', className)}
      {...restProps}>
      {renderLine &&
        (typeof renderLine === 'boolean' ? (
          <div className="x-wizard__line">
            <span className="x-wizard__line-title">
              {steps.find((c) => c.id === activeStep)?.name}
            </span>
            <ul className="x-wizard__line-steps">
              {steps.map((step, index) => {
                return (
                  <li
                    className={classNames('x-wizard__line-step', {
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
            classNames="x-wizard__step"
            unmountOnExit={unmountOnExit}
            timeout={animationDelay!}>
            {step.child}
          </CSSTransition>
        );
      })}
    </div>
  );
};

const Wizard = forwardRef<HTMLDivElement, WizardPropsType>((props, ref) => {
  return <WizardComponent {...props} forawardedRef={ref} />;
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
