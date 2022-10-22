import {fireEvent, render, screen} from '@testing-library/react';
import {Badge} from './Badge';

describe('<Badge />', () => {
  describe('inital state', () => {
    it('should have default class', () => {
      const {container} = render(<Badge />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-badge');
      expect(root).not.toHaveClass('undefined');
    });
    it('should badge type', () => {
      const {container} = render(<Badge />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('type');
    });
  });
});
