import {fireEvent, render, screen} from '@testing-library/react';
import {Skeleton} from './Skeleton';

describe('<Skeleton />', () => {
  describe('initial state', () => {
    it('should have default class', () => {
      const {container} = render(<Skeleton />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-skeleton');
      expect(root).not.toHaveClass('undefined');
    });
    describe('props', () => {
      it('prop:type', () => {
        const {container} = render(<Skeleton />);
        const root = container.firstChild;
      });
    });
  });
});
