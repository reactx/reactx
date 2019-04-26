import React from 'react';

type AlertEvent = {|
  target: Element | Document,
|};

type AlertProps = {
  onClose: (e: AlertEvent) => void,
  message: string,
};

export default function Alert(props) {
  return (
    <div className="alert">
      <div className="text">{props.message}</div>
      {props.onClose && (
        <button className="close" onClick={props.handleClose}>
          X
        </button>
      )}
    </div>
  );
}
