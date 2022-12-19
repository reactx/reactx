/**
 * Copyright (c) Pascal System and ReactX.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import clsx from 'clsx';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import '../assets/elements.tag.scss';
import Tag from './Tag';

interface TagsPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  onTagClicked?: (tag: string | number | readonly string[]) => void;
  onTagAdded?: (tag: string | number | readonly string[]) => void;
  onTagDeleted?: (tag: string | number | readonly string[]) => void;
  className?: string;
  wrapperClassName?: string;
  tagClassName?: string;
  deleteTagClassName?: string;
  deleteTagIconComponent?: React.ReactNode;
  tags: {name: string; id: string}[];
}

function getTagItems(props: TagsPropsType) {
  const {
    onTagClicked,
    tags,
    deleteTagClassName,
    deleteTagIconComponent,
    tagClassName,
    onTagDeleted,
  } = props;
  return tags.map((tag, index) => {
    return (
      <Tag
        key={tag.id + '-' + index}
        tag={tag.name}
        onDelete={onTagDeleted}
        deleteTagClassName={deleteTagClassName}
        deleteTagIconComponent={deleteTagIconComponent}
        onClick={onTagClicked}
        className={tagClassName}
      />
    );
  });
}
const Tags = forwardRef<HTMLInputElement, TagsPropsType>((props, ref) => {
  const {value, onTagAdded, onTagDeleted, tags, className, ...restProps} =
    props;

  const [inputValue, setInputValue] = useState<
    string | number | readonly string[]
  >(value || '');

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setInputValue('');
        if (onTagAdded) onTagAdded(inputValue);
      }
    },
    [inputValue, onTagAdded],
  );
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e?.currentTarget.value);
    },
    [],
  );

  const tagItems = useMemo(() => {
    return getTagItems(props);
  }, [tags]);

  return (
    <div className={clsx('x-tag', props.wrapperClassName)} ref={ref}>
      <input
        {...restProps}
        type='text'
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        value={value}
        className={clsx('x-tag__input', className)}></input>
      {tagItems}
    </div>
  );
});

Tags.defaultProps = {
  value: '',
  wrapperClassName: '',
  tags: [],
};
Tags.displayName = 'Tags';

export {Tags};
