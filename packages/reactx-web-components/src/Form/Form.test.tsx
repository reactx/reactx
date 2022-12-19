import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  it('renders the children elements', () => {
    const {getByTestId} = render(
      <Form>
        <div data-testid='child'>Child</div>
      </Form>,
    );
    const child = getByTestId('child');
    expect(child).toBeInTheDocument();
  });

  it('applies the "x-form--validate" class when validation is enabled', () => {
    const {getByTestId} = render(
      <Form validated>
        <div data-testid='child'>Child</div>
      </Form>,
    );
    const form = getByTestId('form');
    expect(form).toHaveClass('x-form--validate');
  });

  it('does not apply the "x-form--validate" class when validation is disabled', () => {
    const {getByTestId} = render(
      <Form validated={false}>
        <div data-testid='child'>Child</div>
      </Form>,
    );
    const form = getByTestId('form');
    expect(form).not.toHaveClass('x-form--validate');
  });

  it('calls the onSubmit callback when the form is submitted', () => {
    const handleSubmit = jest.fn();
    const {getByTestId} = render(
      <Form onSubmit={handleSubmit}>
        <div data-testid='child'>Child</div>
      </Form>,
    );
    const form = getByTestId('form');
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
