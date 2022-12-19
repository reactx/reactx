import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Control from './Control';

describe('Control', () => {
  it('renders the input field and label', () => {
    const {getByLabelText, getByTestId} = render(
      <Control id='test' label='Test' />,
    );
    const input = getByTestId('input');
    const label = getByLabelText('Test');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders the error message when specified', () => {
    const {getByText} = render(
      <Control id='test' label='Test' error='Invalid input' />,
    );
    const error = getByText('Invalid input');
    expect(error).toBeInTheDocument();
  });

  it('renders the helper text when specified', () => {
    const {getByText} = render(
      <Control id='test' label='Test' helperText='Enter your name' />,
    );
    const helperText = getByText('Enter your name');
    expect(helperText).toBeInTheDocument();
  });

  it('applies the specified class name to the input field', () => {
    const {getByTestId} = render(
      <Control id='test' label='Test' className='custom-class' />,
    );
    const input = getByTestId('input');
    expect(input).toHaveClass('custom-class');
  });

  it('handles changes to the input correctly', () => {
    const onChange = jest.fn();
    const {getByLabelText} = render(
      <Control label='Name' onChange={onChange} />,
    );
    const input: any = getByLabelText('Name');

    fireEvent.change(input, {target: {value: 'Alice'}});

    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe('Alice');
  });
});
