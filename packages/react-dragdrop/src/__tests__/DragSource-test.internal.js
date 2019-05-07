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
import {DragSource} from 'react-dragdrop';

configure({adapter: new Adapter()});

describe('while running in a browser environment', () => {
  let container;

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
    function App() {
      return (
        <div>
          <DragSource index={1} componentType="ITEM">
            <div>Drag Me!</div>
          </DragSource>
        </div>
      );
    }
    ReactDOM.render(<App />, container);

    // expect(wrapper.html()).toMatchPrettyHtmlSnapshot();
  });
});
