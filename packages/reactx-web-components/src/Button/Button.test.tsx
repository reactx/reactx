import {fireEvent, render, screen} from '@testing-library/react';
import {Button} from './Button';

describe('<Button />', () => {
  describe('inital state', () => {
    it('should have deafult calss', () => {
      const {container} = render(<Button />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-btn');
      expect(root).not.toHaveClass('undefined');
    });

    it('should button type', () => {
      const {container} = render(<Button />);
      const root = container.firstChild;

      expect(root).toHaveAttribute('type', 'button');
    });
  });
  describe('props', () => {
    it('prop:type', () => {
      const {container} = render(<Button type='submit' />);
      const root = container.firstChild;
      expect(root).toHaveAttribute('type', 'submit');
    });
    it('prop: children: text', () => {
      const {container} = render(<Button>This is a button</Button>);
      const root = container.firstChild;
      expect(root).toHaveTextContent('This is a button');
    });
    it('prop: children React Node', () => {
      const {container} = render(
        <Button>
          <a />
        </Button>,
      );
      const root = container.firstChild?.firstChild;
      expect(root).toContainHTMl('<a />');
    });
    it('prop:multipe attributes', () => {
      const {container} = render(<Button id='1' disabled />);
      const root = container.firstChild;
      expect(root).toHaveAttribute('id');
      expect(root).toHaveAttribute('disabled');
    });
    it('prop: disabled', () => {
      const {container} = render(<Button disabled />);
      const root = container.firstChild;
      expect(root).toBeDisabled();
    });
    it('prop: ref', () => {
      const buttonref: {current: HTMLButtonElement | null} = {
        current: null,
      };
      render(<Button ref={buttonref} />);
      expect(buttonref.current).toBeDefined();
    });
  });
  describe('events', () => {
    it('on click', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toBeCalledTimes(0);
    });
  });
  describe('accessibility',()=>{
    it('sets aria-disabled="true" when componenet is disabled',()=>{
        const {getByRole} = render(<Button disabled></Button>);
        expect(getByRole('button')).toHaveAttribute('aria-disabled');
    })
  })
});
