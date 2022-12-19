/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';

import {Swiper as SwipperCP, SwiperSlide, SwiperSlideProps} from 'swiper/react';
import {SwiperOptions} from 'swiper/types';

import 'swiper/css';

export interface SwiperPropsType extends SwiperOptions {
  className?: string;
  children: React.ReactElement<SwiperSlideProps, typeof SwiperSlide>[];
}

const Swiper = (props: SwiperPropsType) => {
  const {className, children, ...restProps} = props;

  return (
    <SwipperCP className={clsx('x-swiper', className)} {...restProps}>
      {children}
    </SwipperCP>
  );
};

Swiper.defaultProps = {
  spaceBetween: 50,
  slidesPerView: 3,
};

export {Swiper};
