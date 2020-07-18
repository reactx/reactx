/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Input} from '@reactx/reactx-components';

describe('while running in a browser environment', () => {
  let container, wrapper, onSetOpen;

  beforeEach(() => {
    jest.resetModules();
    onSetOpen = jest.fn();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.render(null, container);
    document.body.removeChild(container);
    container = null;
  });

  it('should render correctly', () => {
    wrapper = (
      <div>
        <Input label="salam"></Input>
      </div>
    );
    expect(ReactDOM.render(wrapper, container)).toMatchSnapshot();
  });
});
