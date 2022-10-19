import {fireEvent, render, screen} from '@testing-library/react';
import {Accordion} from './Accordion';

describe('<Accordion />', () => {
  describe('initial state', () => {
    it('should have default class', () => {
      const {container} = render(<Accordion />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-accordion');
      expect(root).not.toHaveClass('undefined');
    });
    it('should be accordion', () => {
      const {container} = render(<Accordion />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('type', 'radio');
      expect(root).toHaveAttribute('type', 'checkbox');
    });
  });
  describe('props', () => {
    it('prop:type', () => {
      const {container} = render(<Accordion type='radio' />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('type', 'radio');
    });
    it('prop:type', () => {
      const {container} = render(<Accordion type='checkbox' />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('type', 'checkbox');
    });
    it('prop: children React node', () => {
      const {container} = render(
        <Accordion>
          <img />
        </Accordion>,
      );
      const root = container.firstChild;

      expect(root).toContainHTML('<img/>');
    });
  });
  describe('events', () => {
    it('on click', () => {
      const handleClick = jest.fn();
      render(<Accordion onClick={handleClick} />);
      const accordion = screen.getByLabelText('label');
      fireEvent.click(accordion);

      expect(handleClick).toBeCalledTimes(0);
    });
  });
});
