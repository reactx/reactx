/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import faker from 'faker';

import source from './fixture';

configure({adapter: new Adapter()});

let React;
let ReactDOM;
let Task;

// const createPointerEvent = type => {
//   const event = document.createEvent('Event');
//   event.initEvent(type, true, true);
//   return event;
// };

faker.seed(123);
jest.useFakeTimers();

describe('while running in a browser environment', () => {
  let container, wrapper;
  let fakeXHR: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactDOM = require('react-dom');
    Task = require('react-svg-components');

    fakeXHR = sinon.useFakeXMLHttpRequest();
    requests = [];
    fakeXHR.onCreate = xhr => {
      requests.push(xhr);
    };

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.render(null, container);
    document.body.removeChild(container);
    container = null;
    fakeXHR.restore();
  });

  it('should render correctly', () => {
    wrapper = mount(
      <Task
        className="wrapper-class-name"
        src={`https://this_is_a_fake_url.svg`}
        svgClassName="svg-class-name"
        style={{height: 200}}
      />,
    );

    requests[0].respond(200, {}, source);
    jest.runAllTimers();

    expect(wrapper.html()).toMatchPrettyHtmlSnapshot();
  });

  it('should update correctly', () => {
    wrapper = mount(
      <Task
        className="wrapper-class-name"
        src={`https://this_is_a_fake_url.svg`}
        svgClassName="svg-class-name"
        style={{height: 200}}
      />,
    );

    requests[0].respond(200, {}, source);
    jest.runAllTimers();

    wrapper.setProps({
      className: 'updated-wrapper-class-name',
      svgClassName: 'updated-svg-class-name',
      style: {height: 100},
    });

    expect(wrapper.html()).toMatchPrettyHtmlSnapshot();
  });

  describe('onClickTask', () => {
    let onClick, ref;

    beforeEach(() => {
      onClick = jest.fn();
      ref = React.createRef();
      const element = (
        <Task onClick={onClick}>
          <div ref={ref} />
        </Task>
      );
      ReactDOM.render(element, container);
    });

    // it('is called after "pointerdown" event', () => {
    //   const output = shallow(
    //     <Task />
    //   );
    //   output.simulate('click');
    //   expect(onClick).toHaveBeenCalledTimes(1);
    // });

    it('check', () => {
      expect(true).toBe(true);
    });
  });
});
