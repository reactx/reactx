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
import {Autocomplete} from 'reactx-components';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
const items = [
  {id: 'foo', label: 'foo'},
  {id: 'bar', label: 'bar'},
  {id: 'baz', label: 'baz'},
];
describe('while running in a browser environment', () => {
  let container, wrapper;
  let onChange, onSelect;

  beforeEach(() => {
    jest.resetModules();
    onChange = jest.fn();
    onSelect = jest.fn();
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
       <Autocomplete
          items={items}
          getItemValue={item => item.label}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}>
              {item.label}
            </div>
          )}
          value={items[0].id}
          onChange={onChange}
          onSelect={onSelect}
        />
      </div>
    );

    expect(ReactDOM.render(wrapper, container)).toMatchSnapshot();
  });
});

describe('onChange', () => {
  let wrapper, autocompleteInputWrapper;
  const setState = jest.fn();
  const isOpenSpy = jest.spyOn(React, 'useState');
  let onChange, onSelect, shouldItemRender;

  beforeEach(() => {
    onChange = jest.fn();
    onSelect = jest.fn();
    shouldItemRender = jest.fn();
    const Component = () => {
      return (
        <Autocomplete
          items={items}
          getItemValue={item => item.label}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}>
              {item.label}
            </div>
          )}
          value={items[0].id}
          onChange={onChange}
          onSelect={onSelect}
        />
      );
    };
    wrapper = mount(Component({}));
    autocompleteInputWrapper = wrapper.find('input');
    isOpenSpy.mockImplementation(init => [init, setState]);
  });

  it('is called for mouse pointers', () => {
    debugger;
    expect(setState).toHaveBeenCalledTimes(0);
    // expect(
    //   autocompleteInputWrapper.instance().getAttribute('aria-expanded'),
    // ).toBe('false');

    // autocompleteInputWrapper.props('onChange')({
    //   target: {
    //     value: 'aaa',
    //   },
    // });

    // expect(wrapper.instance().refs.menu).toBe(undefined);

    // Display autocomplete menu upon input focus
    // autocompleteInputWrapper.simulate('focus');
    expect(setState).toHaveBeenCalledTimes(0);
    // expect(wrapper.instance().isOpen).toBe(true);
    // expect(wrapper.instance().refs.menu).not.toBe(undefined);
  });
});
