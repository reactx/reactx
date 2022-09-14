/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';

import '../assets/elements.tag.scss';

export interface TagPropsType
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: TagVariant;
    colorVariant?: Variant;
}

const [newTag, setNewTag] = useState([]);

function handleChange(e) {
    setNewTag(e.target.value);
  }

// TODO: set tags in handleKeyDown function.
function handleKeyDown(e){
    if(e.keyCode === 13 && e.target.value !== ""){
        setNewTag(newTag.trim());
    }
}

const Tag = forwardRef<HTMLInputElement, TagPropsType>((props, ref) => {
    const {
        variant,
        colorVariant,
        className,
        children,
        ...restProps
    } = props;
    return (
        <div>
            <div className='x-tag'>
                <span  className="x-tag__span" {...props} />;
                <input
                    ref={ref}
                    className={clsx(
                        'x-tag__input',
                        'x-tag__input' + variant,
                        'x-tag__input' + colorVariant,
                        className
                    )}
                    type={"text"}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    {...restProps}
                />
            </div>
        </div>
    )

})

Tag.displayName = 'tag';
export { Tag };