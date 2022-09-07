/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

 import clsx from 'clsx';
 import React, {ForwardedRef, forwardRef} from 'react';
 import '../assets/elements.image.scss';
 
 export interface ImagePropsType
   extends React.ImageHTMLAttributes<HTMLImageElement> {
   forawardedRef?: ForwardedRef<HTMLImageElement>;
   loading?: boolean | React.ReactNode;
 }
 
 const ImageComponent = (props: ImagePropsType) => {
   const {
     forawardedRef,
     className,
     children,
     ...restProps
   } = props;
 
   return (
    <img
       role='image'
       ref={forawardedRef}
       className={clsx(
         'x-img',
         className,
       )}
       {...restProps}/>
   );
 };
 
 const Image = forwardRef<HTMLImageElement, ImagePropsType>((props, ref) => {
   return <ImageComponent {...props} forawardedRef={ref} />;
 });
 
 Image.defaultProps = {
   type: 'img',
 };
 
 Image.displayName = 'Image';
 export {Image};
 