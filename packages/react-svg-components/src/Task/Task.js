/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';
import ReactSVG from 'react-svg';
import type {Errback} from '../ReactSVG';

type TaskEvent = {|
  target: Element | Document,
|};

type EvalScript = 'always' | 'once' | 'never';

type Wrapper = 'div' | 'span';

type TaskProps = {
  onClick: (e: TaskEvent) => void,
  onInjected: Errback,
  fallback?: (e: TaskEvent) => void,
  src: string,
  loading?: string | Object,
  renumerateIRIElements?: boolean,
  evalScripts?: EvalScript,
  className?: string,
  svgClassName?: string,
  style?: string | Object,
  wrapper?: Wrapper,
};
type DefaultTaskProps = {
  src: string,
  renumerateIRIElements?: boolean,
  evalScripts: EvalScript,
  className: string,
  svgClassName: string,
  style?: string | Object,
  wrapper: Wrapper,
};

const defaultStyles: string | Object = {};

function createDefaultProps(): DefaultTaskProps {
  return {
    src: 'svg.svg',
    evalScripts: 'always',
    renumerateIRIElements: false,
    className: 'task-wrapper',
    svgClassName: 'task-svg',
    style: defaultStyles,
    wrapper: 'div',
  };
}

export default function Task(userProps: TaskProps) {
  const {onClick, onInjected} = useTask(userProps);
  let props: TaskProps = Object.assign(
    {},
    {...createDefaultProps()},
    {...userProps},
  );

  return (
    <ReactSVG
      // Required props.
      src={props.src}
      // Optional props.
      evalScripts={props.evalScripts}
      fallback={props.fallback}
      loading={props.loading}
      onInjected={onInjected}
      renumerateIRIElements={props.renumerateIRIElements}
      svgClassName={props.svgClassName}
      svgStyle={props.style}
      wrapper={props.wrapper}
      // Non-documented props.
      className={props.className}
      onClick={onClick}
    />
  );
}

export const useTask = (props: TaskProps) => {
  function onClick(e: TaskEvent): void {
    if (props.onClick) {
      props.onClick(e);
    }
  }

  function onInjected(error: Error | null, svg?: Element): void {
    if (props.onInjected) {
      props.onInjected(error, svg);
    }
  }

  return {
    onClick,
    onInjected,
  };
};
