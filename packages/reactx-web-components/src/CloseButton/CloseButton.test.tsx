import {fireEvent, render, screen} from '@testing-library/react';
import {CloseButton} from './CloseButton';

describe('<CloseButton />', () => {
  describe('inital state', () => {
    it('should have deafult calss', () => {
      const {container} = render(<CloseButton />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-btn--close');
      expect(root).not.toHaveClass('undefined');
    });

    it('should close button type', () => {
      const {container} = render(<CloseButton />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('type', 'button');
    });
  });
  describe('props', () => {
    it('prop:type', () => {
      const {container} = render(<CloseButton type='submit' />);
      const root = container.firstChild;
      expect(root).toHaveAttribute('type', 'submit');
    });
    it('prop: children: text', () => {
      const {container} = render(
        <CloseButton>This is a close button</CloseButton>,
      );
      const root = container.firstChild;
      expect(root).toHaveTextContent('This is a close button');
    });
    it('prop: children React Node', () => {
      const {container} = render(
        <CloseButton>
          <a />
        </CloseButton>,
      );
      const root = container.firstChild?.firstChild;
      expect(root).toContainHTMl('<a />');
    });
    it('prop:multipe attributes', () => {
      const {container} = render(<CloseButton id='1' disabled />);
      const root = container.firstChild;
      expect(root).toHaveAttribute('id');
      expect(root).toHaveAttribute('disabled');
    });
    it('prop: disabled', () => {
      const {container} = render(<CloseButton disabled />);
      const root = container.firstChild;
      expect(root).toBeDisabled();
    });
    it('prop: ref', () => {
      const buttonref: {current: HTMLButtonElement | null} = {
        current: null,
      };
      render(<CloseButton ref={buttonref} />);
      expect(buttonref.current).toBeDefined();
    });
  });
  describe('events', () => {
    it('on click', () => {
      const handleClick = jest.fn();
      render(<CloseButton onClick={handleClick} />);
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      expect(handleClick).toBeCalledTimes(0);
    });
  });
  describe('accessibility', () => {
    it('sets aria-disabled="true" when componenet is disabled', () => {
      const {getByRole} = render(<CloseButton disabled></CloseButton>);
      expect(getByRole('button')).toHaveAttribute('aria-disabled');
    });
  });
});
