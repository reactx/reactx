/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';

type AlertEvent = {|
  target: Element | Document,
|};

type AlertProps = {
  onClose: (e: AlertEvent) => void,
};

export default function Alert(props: AlertProps) {
  return (
    <div className="alert">
      <div className="text">{props.children}</div>
      {props.onClose && (
        <button className="close" onClick={props.handleClose}>
          X
        </button>
      )}
    </div>
  );
}
