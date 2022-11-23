/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import {createPopper, Placement} from '@popperjs/core';
import clsx from 'clsx';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import '../assets/elements.tooltip.scss';

export interface TooltipPropsType
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: React.ReactElement;
  place?: Placement;
  flip?: boolean;
  preventOverflow?: boolean;
  offset?: [number, number];
  showArrow?: boolean;
}

const Tooltip = (props: TooltipPropsType) => {
  const {
    className,
    title,
    children,
    offset,
    flip,
    showArrow,
    preventOverflow,
    place,
    ...restProps
  } = props;

  const [showTootltip, setShowTootltip] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const handleRef = useRef<HTMLElement | null>(null);

  //we should not memoize children props
  //because It might change from the parent
  //and we might need that change in the slot/children
  const childrenProps = {
    ...children.props,
    ref: handleRef,
  };

  useEffect(() => {
    if (!showTootltip || !handleRef.current || !tooltipRef.current) return;

    const modifiers = [
      {
        name: 'arrow',
        options: {
          element: arrowRef.current,
        },
      },
      {
        name: 'offset',
        options: {
          offset,
        },
      },
      {
        name: 'flip',
        options: {
          altBoundary: flip,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          altBoundary: preventOverflow,
        },
      },
    ];
    const popper = createPopper(handleRef.current!, tooltipRef.current!, {
      placement: place,
      modifiers,
    });

    //destroy popper for garbage collector
    return () => {
      popper.destroy();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [showTootltip]);

  const handleMouseOver = useCallback(() => {
    setShowTootltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowTootltip(false);
  }, []);

  useEffect(() => {
    const ref = handleRef.current;
    if (!ref) return;
    //we add mousemove and mouseleave event listener after child rendered
    //we should not pass these events to the childProps because the child could be a react element
    ref.addEventListener('mouseover', handleMouseOver);
    ref.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref.removeEventListener('mouseover', handleMouseOver);
      ref.removeEventListener('mouseleave', handleMouseLeave);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [handleRef.current]);
  return (
    <React.Fragment>
      {React.cloneElement(children, childrenProps)}
      {showTootltip
        ? createPortal(
            <span
              role='tooltip'
              ref={tooltipRef}
              className={clsx('x-tooltip', 'x-tooltip--' + place, className)}
              {...restProps}>
              {title}
              {showArrow && (
                <span className='x-tooltip__arrow' ref={arrowRef}></span>
              )}
            </span>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
};

Tooltip.defaultProps = {
  place: 'top',
  flip: true,
  preventOverflow: true,
  offset: [0, 5],
  showArrow: true,
};

Tooltip.displayName = 'Tooltip';
export {Tooltip};
