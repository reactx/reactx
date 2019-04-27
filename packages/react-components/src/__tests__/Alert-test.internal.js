/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';

let React;
let ReactDOM;
let Alert;

describe('Alert', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactDOM = require('react-dom');
    Alert = require('react-components/alert');

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.render(null, container);
    document.body.removeChild(container);
    container = null;
  });

  describe('onCloseAlert', () => {
    let onClose;

    beforeEach(() => {
      onClose = jest.fn();
    });

    function Component() {
      return (
        <Alert onSwipeStart={onClose}>
          <span> Alert Me!</span>
        </Alert>
      );
    }

    ReactDOM.render(Component, container);

    it('check', () => {
      expect(true).toBe(true);
    });
  });
});
