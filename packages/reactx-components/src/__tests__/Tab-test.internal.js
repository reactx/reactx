/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';
import {Tab, TabPanel, Tabs} from '@reactx/reactx-components';
import React from 'react';
import ReactDOM from 'react-dom';

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
    wrapper = (
      <div>
        <Tabs value={0}>
          <Tab label={'First'} id={0} />
          <Tab label={'Second'} id={1} />
          <Tab label={'Third'} id={2} />
          <TabPanel index={0}>First Panel</TabPanel>
          <TabPanel index={1}>Second Panel</TabPanel>
          <TabPanel index={2}>Third Panel</TabPanel>
        </Tabs>
      </div>
    );

    expect(ReactDOM.render(wrapper, container)).toMatchSnapshot();
  });
});
