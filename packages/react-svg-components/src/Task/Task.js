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
import {Errback} from '../../inline-typed';

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
  loading?: string | object,
  renumerateIRIElements?: boolean,
  evalScripts?: EvalScript,
  className?: string,
  svgClassName?: string,
  style?: React.CSSProperties,
  wrapper?: Wrapper,
};
type DefaultTaskProps = {
  src: string,
  renumerateIRIElements?: boolean,
  evalScripts: EvalScript,
  className: string,
  svgClassName: string,
  style?: React.CSSProperties,
  wrapper: Wrapper,
};

const defaultStyles: React.CSSProperties = {
  width: 200,
};

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
  const [onClick, onInjected] = useTask(userProps);
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
    props.onClick(e);
  }

  function onInjected(error, svg): void {
    props.onInjected(error, svg);
  }

  return {
    onClick,
    onInjected,
  };
};
