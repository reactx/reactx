/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';

import '../assets/elements.swiper.scss';
import 'swiper/css';

export interface SwiperPropsType {
  variant?: SwiperVariant;
}

const Swiper = forwardRef<HTMLDivElement, SwiperPropsType>((props, ref) => {
  const {className, children, variant, ...restProps} = props;

  return (
    <Swiper
      clssName={clsx('x-swiper', 'x-swiper' + variant)}
      spaceBetween={50}
      slidesPerview={3}
      {...restProps}>
      <SwiperSlide>{children}</SwiperSlide>
    </Swiper>
  );
});
