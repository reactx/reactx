import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Card} from './Card';

afterEach(cleanup);

describe('Card', () => {
  it('renders the header', () => {
    const {getByText} = render(<Card header='Card Header'>Card Body</Card>);
    expect(getByText('Card Header')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    const {getByText} = render(<Card header='Card Footer'>Card Body</Card>);
    expect(getByText('Card Footer')).toBeInTheDocument();
  });

  it('does not render the title if not provided', () => {
    const {queryByText} = render(<Card>Card Body</Card>);
    expect(queryByText('Card Title')).toBeNull();
  });

  it('renders the children', () => {
    const {getByText} = render(<Card>Card Body</Card>);
    expect(getByText('Card Body')).toBeInTheDocument();
  });

  it('applies the className prop', () => {
    const {container} = render(<Card className='my-card'>Card Body</Card>);
    expect(container.firstChild).toHaveClass('x-card my-card');
  });
});
