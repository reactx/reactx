import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Skeleton} from './Skeleton';

afterEach(cleanup);

describe('Skeleton', () => {
  it('renders the correct number of lines', () => {
    const {container} = render(<Skeleton lines={3} />);
    expect(container.querySelectorAll('.skeleton > div')).toHaveLength(3);
  });

  it('sets the correct default values', () => {
    const {container} = render(<Skeleton />);
    expect(container.querySelectorAll('.skeleton > div')).toHaveLength(1);
  });
});
