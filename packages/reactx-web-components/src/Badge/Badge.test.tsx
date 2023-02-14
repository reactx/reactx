import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Badge} from './Badge';

afterEach(cleanup);

describe('Badge', () => {
  it('renders the correct class for the color prop', () => {
    const {getByText} = render(<Badge color='solid'>New</Badge>);
    expect(getByText('New')).toHaveClass('badge--solid');
  });

  it('renders the pill class when the pill prop is true', () => {
    const {getByText} = render(<Badge pill>2</Badge>);
    expect(getByText('2')).toHaveClass('badge--pill');
  });

  it('renders the children', () => {
    const {getByText} = render(<Badge>Hello</Badge>);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
