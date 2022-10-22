import {fireEvent, render, screen, cleanup} from '@testing-library/react';
import {SwiperSlide, Swiper} from 'swiper/react';

describe('<Swiper />', () => {
  describe('initial state', () => {
    it('should have default class', () => {
      const {container} = render(<Swiper />);
      const root = container.firstChild;

      expect(root).toHaveClass('x-swiper');
      expect(root).not.toHaveClass('undefined');
    });
  });
});
describe('<SwiperSlide/>', () => {
  afterEach(cleanup);

  it('handles empty gallery', () => {
    const {container} = render(<SwiperSlide />);
    const root = container.firstChild;
    expect(root).toBeEmptyDOMElement();
  });

  describe('when in Desktop view', () => {
    it('should show current image in slider', () => {
      const {container} = render(<SwiperSlide />);
      const root = container.firstChild;
      // TODO:add current image in slider
    });
  });
});
