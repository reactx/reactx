/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';

type AlertProps = {
  onClose: (e: SyntheticEvent<HTMLButtonElement>) => void,
  text: string,
};

export default function Alert(props: AlertProps) {
  return (
    <div className="alert">
      <div className="text">{props.text}</div>
      {props.onClose && (
        <button className="close" onClick={props.onClose}>
          X
        </button>
      )}
    </div>
  );
}
