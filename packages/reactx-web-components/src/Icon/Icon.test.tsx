import {fireEvent, render, screen} from '@testing-library/react';
import {SvgIcon} from './Icon';

describe('<SvgIcon/>', () => {
  describe('initial state', () => {
    it('should have default class', () => {
      const {container} = render(<SvgIcon />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-icon');
      expect(root).not.toHaveClass('undefined');
    });
  });
  describe('props', () => {
    it('prop:children:text', () => {
      const {container} = render(<SvgIcon>This is a icon</SvgIcon>);
      const root = container.firstChild;

      expect(root).toHaveTextContent('This is a icon');
    });
    it('prop:children: React Node', () => {
      const {container} = render(
        <SvgIcon>
          <a />
        </SvgIcon>,
      );
      const root = container.firstChild?.firstChild;

      expect(root).toContainHTML('<a />');
    });
  });
});
