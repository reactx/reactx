import {fireEvent, getByRole, render, screen} from '@testing-library/react';
import {Alert} from './Alert';

describe('<Alert />', () => {
  describe('initial state', () => {
    it('should have deafault class', () => {
      const {container} = render(<Alert />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-alert');
      expect(root).not.toHaveClass('undefined');
    });
    it('should alert type', () => {
      const {container} = render(<Alert />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('role', 'alert');
    });
    it('should be visible', () => {
      const {container} = render(<Alert />);
      const root = container.firstChild;

      expect(root).toBeVisible();
    });
  });
  describe('events', () => {
    it('on close', () => {
      const handleClose = jest.fn();
      render(<Alert onClose={handleClose} />);
      const alert = screen.getByRole('alert');
      fireEvent.change(alert);

      expect(handleClose).toBeCalledTimes(0);
    });
  });
  describe('accessibilty', () => {
    it('sets aria-live="assertive" and aria-atomic="true"', () => {
      const {getByRole} = render(<Alert />);

      expect(getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
      expect(getByRole('alert')).toHaveAttribute('aria-atomic', 'true');
    });
  });
});
