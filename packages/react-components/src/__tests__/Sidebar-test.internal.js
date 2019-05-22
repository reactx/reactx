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
import {Sidebar} from 'react-components';
import renderer from 'react-test-renderer';

describe('while running in a browser environment', () => {
  let container, wrapper;

  beforeEach(() => {
    jest.resetModules();

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.render(null, container);
    document.body.removeChild(container);
    container = null;
  });

  it('should render correctly', () => {
    wrapper = renderer
      .create(
        <div>
          <Sidebar>
            <p>salam</p>
          </Sidebar>
        </div>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
