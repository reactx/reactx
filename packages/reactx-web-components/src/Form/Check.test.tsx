import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Check from './Check';

describe('Check', () => {
  it('renders the input field and label', () => {
    const {getByLabelText, getByTestId} = render(
      <Check id='test' label='Test' />,
    );
    const input = getByTestId('input');
    const label = getByLabelText('Test');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders a checkbox input field by default', () => {
    const {getByTestId} = render(<Check id='test' label='Test' />);
    const input: any = getByTestId('input');
    expect(input.type).toBe('checkbox');
  });

  it('renders a radio input field when specified', () => {
    const {getByTestId} = render(<Check id='test' label='Test' type='radio' />);
    const input: any = getByTestId('input');
    expect(input.type).toBe('radio');
  });

  it('renders the input field and label inline when specified', () => {
    const {getByTestId} = render(<Check id='test' label='Test' inline />);
    const container = getByTestId('container');
    expect(container).toHaveClass('x-check--inline');
  });

  it('applies the "x-is-valid" class when specified', () => {
    const {getByTestId} = render(<Check id='test' label='Test' isValid />);
    const container = getByTestId('container');
    expect(container).toHaveClass('x-is-valid');
  });

  it('applies the "x-is-invalid" class when specified', () => {
    const {getByTestId} = render(<Check id='test' label='Test' isInvalid />);
    const container = getByTestId('container');
    expect(container).toHaveClass('x-is-invalid');
  });

  it('updates the value of the input field when changed', () => {
    const {getByTestId} = render(<Check id='test' label='Test' />);
    const input: any = getByTestId('input');
    fireEvent.change(input, {target: {checked: true}});
    expect(input.checked).toBe(true);
  });
});
