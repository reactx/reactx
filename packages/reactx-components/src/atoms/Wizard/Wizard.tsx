/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {FC, ForwardedRef, forwardRef, useMemo} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export type StepsType = {
  name: string;
  id: number;
  child: React.ReactNode;
};
export interface WizardPropsType
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  renderLine?: (steps: Array<string>) => React.ReactNode;
  children: React.ReactElement;
  activeStep: number;
  animationDelay?: number;
}

const WizardComponent = (props: WizardPropsType) => {
  const {
    forawardedRef,
    className,
    children,
    activeStep,
    animationDelay,
    renderLine,
    ...restProps
  } = props;
  const steps = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      return {
        name: (child.props && child.props.name) || `step${index + 1}`,
        id: index + 1,
        child,
      };
    });
  }, [children]);

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-wizard', className)}
      {...restProps}>
      {renderLine && renderLine(steps.map(c=>c.name))}
      {steps.map((step) => {
        return (
          <TransitionGroup>
            <CSSTransition
              key={step.id}
              in={step.id === activeStep}
              classNames="x-wizard__step"
              timeout={animationDelay!}>
              {step.child}
            </CSSTransition>
          </TransitionGroup>
        );
      })}
    </div>
  );
};

const Wizard: FC<WizardPropsType> = forwardRef<HTMLDivElement, WizardPropsType>(
  (props, forawardedRef) => {
    return <WizardComponent {...props} forawardedRef={forawardedRef} />;
  },
);
Wizard.defaultProps = {
  animationDelay: 300,
};
Wizard.displayName = 'Wizard';
export {Wizard};
