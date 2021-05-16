/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';
import {Autocomplete} from '@reactx/reactx-components';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
configure({adapter: new Adapter()});

const items = [
  {id: 'foo', label: 'foo'},
  {id: 'bar', label: 'bar'},
  {id: 'baz', label: 'baz'},
];
describe('Autocomplete', () => {
  let wrapper;

  describe('while running in a browser environment', () => {
    let onChange, onSelect;

    beforeEach(() => {
      jest.resetModules();
      onChange = jest.fn();
      onSelect = jest.fn();
    });

    it('should render correctly', () => {
      wrapper = (
        <div>
          <Autocomplete
            items={items}
            showArrow={true}
            getItemValue={(item) => item.label}
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
      const tree = renderer.create(wrapper).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('change', () => {
    let onChange, onSelect, container, inputWrapper, currentValue;
    beforeEach(() => {
      currentValue = items[0].id;
      onChange = jest.fn((done) => {
        currentValue = done.target.value;
      });

      onSelect = jest.fn((value) => {
        currentValue = value;
      });
      wrapper = (
        <Autocomplete
          items={items}
          getItemValue={(item) => item.label}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}>
              {item.label}
            </div>
          )}
          value={currentValue}
          onChange={onChange}
          onSelect={onSelect}
        />
      );
      container = mount(wrapper);
      inputWrapper = container.find('input');
    });

    it('should be default value', () => {
      expect(inputWrapper.instance().getAttribute('aria-expanded')).toBe(
        'false',
      );
      expect(currentValue).toBe('foo');
    });

    it('is change by onSelect props', () => {
      inputWrapper.simulate('focus');
      expect(container.find('div').at(1).props().children.length).toBe(3);

      inputWrapper.simulate('keydown', {key: 'ArrowDown'});
      inputWrapper.simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(currentValue).toBe('bar');
    });

    it('is change by onChange props', () => {
      inputWrapper.props().onChange({
        target: {
          value: 'bar',
        },
      });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(currentValue).toBe('bar');
    });
  });
});
