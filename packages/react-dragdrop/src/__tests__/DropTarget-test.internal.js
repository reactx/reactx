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
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {DropTarget} from 'react-dragdrop';

configure({adapter: new Adapter()});
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
    // let ref = React.createRef();
    wrapper = (
      <DropTarget index={1} componentType="ITEM">
        <div>Drop Here!</div>
      </DropTarget>
    );
    ReactDOM.render(wrapper, container);

    // expect(wrapper.html()).toMatchPrettyHtmlSnapshot();
  });
});
