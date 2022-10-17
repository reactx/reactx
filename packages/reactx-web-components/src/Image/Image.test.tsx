import {fireEvent, render, screen} from '@testing-library/react';
import {Image} from './Image';

describe('<Image />', () => {
  describe('initial state', () => {
    it('should have default class', () => {
      const {container} = render(<Image alt='' />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-image');
      expect(root).not.toHaveClass('undefiend');
    });
  });
  describe('props', () => {
    it('prop: alt and lazy loading', () => {
      const {container} = render(<Image alt='Alt Image' />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('alt', 'Alt Image');
      expect(root).toHaveAttribute('loading', 'lazy');
    });

    it('prop: multiple attributes', () => {
      const {container} = render(<Image alt='' src='' id='1'/>);
      const root = container.firstChild;
      expect(root).toHaveAttribute('id');
      expect(root).toHaveAttribute('src');
      expect(root).toHaveAttribute('alt');
    });
  });
});
