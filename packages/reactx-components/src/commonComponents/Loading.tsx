import React, {FC, useEffect, useRef, useState} from 'react';
import {BaseColor, LoadingSizeType} from '../../inline-typed';

export type loadingProps = {
  id?: string;
  size?: LoadingSizeType;
  color?: BaseColor;
  text?: string;
  className?: string;
  enabled?: boolean;
};

const LoadingComponent = (props: loadingProps) => {
  const [lastState, setLast] = useState<boolean>(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingRef.current) return;
    if (loadingRef.current && props.enabled) {
      loadingRef.current.classList.add('loading-enable');
      loadingRef.current.classList.remove('loading-disable');
      setLast(true);
    } else if (loadingRef.current && lastState) {
      loadingRef.current.classList.remove('loading-enable');
      loadingRef.current.classList.add('loading-disable');
      setLast(false);
      setTimeout(function () {
        if (loadingRef.current)
          loadingRef.current.classList.remove('loading-disable');
      }, 3000);
    }
  }, [props.enabled]);

  return (
    <div
      id={props.id}
      ref={loadingRef}
      className={(props.className || '') + 'reactx-loading'}>
      <div
        className={
          'loading-loader ' +
          (props.color ? ' reactx-loading-' + props.color : '') +
          (props.size !== 'extra' ? ' loading-size-' + props.size : '')
        }>
        <div className="loading-circle" />
        <div className="loading-circle" />
        <div className="loading-circle" />
        <div className="loading-circle" />
        <div className="loading-circle" />
      </div>
      <span className="loading-text">{props.text}</span>
    </div>
  );
};

const Loading: FC<loadingProps> = React.forwardRef((props) => (
  <LoadingComponent {...props} />
));
Loading.defaultProps = {
  color: BaseColor.primary,
  size: 'extra',
};
export {Loading};
