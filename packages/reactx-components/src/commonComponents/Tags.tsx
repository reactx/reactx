/**
 * Copyright (c) Pascal System and ReactX.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useCallback, useState, useMemo, memo} from 'react';
import Tag from './Tag';
type TagsPropsType = {
  onBlurInput?: (e: EventTarget) => void;
  onFocusInput?: (e: EventTarget) => void;
  onKeyDownInput?: (e: EventTarget) => void;
  onChangeInput?: (e: EventTarget) => void;
  onTagClicked?: (tag: string) => void;
  onTagAdded?: (tag: string) => void;
  onTagDeleted?: (tag: string) => void;
  tagInputPlaceHolder?: string;
  tagInputName?: string;
  tagInputId?: string;
  tagInputMaxLength?: number;
  tagInputFieldClassName?: string;
  className?: string;
  tagClassName?: string;
  tagWrapperClassName?: string;
  deleteTagClassName?: string;
  inputValue?: string;
  deleteTagIconComponent?: React.ReactNode;
  tags: {name: string; id: string}[];
};

function createDefaultProps() {
  return {
    tagInputPlaceHolder: '',
    tagInputName: '',
    tagInputId: '',
    tagInputMaxLength: 100,
    tagInputFieldClassNames: '',
    inputValue: '',
    tagClassName: '',
    tags: [],
  };
}

function getTagItems(props: TagsPropsType) {
  return props.tags.map((tag, index) => {
    if (index < props.tags.length - 1) {
      return (
        <Tag
          key={tag.id + '-' + index}
          tag={tag.name}
          onClick={props.onTagClicked}
          className={props.tagClassName}
        />
      );
    } else {
      return (
        <Tag
          key={tag.id + '-' + index}
          tag={tag.name}
          //   labelField={labelField}
          deleteTagIconComponent={props.deleteTagIconComponent}
          deleteTagClassName={props.deleteTagClassName}
          onDelete={props.onTagDeleted}
          //   moveTag={moveTag}
          //   removeComponent={removeComponent}
          onClick={props.onTagClicked}
          //   readOnly={readOnly}
          className={props.tagClassName}
          //   allowDragDrop={allowDragDrop}
        />
      );
    }
  });
}

function Tags(userProps: TagsPropsType) {
  const defaultProps = useMemo(() => {
    return {...createDefaultProps()};
  }, []);
  const props: TagsPropsType = Object.assign(
    {},
    {...defaultProps},
    {...userProps},
  );

  const [value, setValue] = useState<string>(props.inputValue || '');

  const onBlur = useCallback((e) => {}, []);
  const onFocus = useCallback((e) => {}, []);
  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        setValue('');
        if (props.onTagAdded) props.onTagAdded(value);
      }
    },
    [value],
  );
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onTagDeleted = useCallback(
    (e: string) => {
      if (props.onTagDeleted) {
        props.onTagDeleted(e);
      }
    },
    [props.tags],
  );

  const tagItems = useMemo(() => {
    return getTagItems({...props, onTagDeleted});
  }, [props.tags]);

  return (
    <div className={props.tagWrapperClassName}>
      <input
        type="text"
        placeholder={props.tagInputPlaceHolder}
        aria-label={props.tagInputPlaceHolder}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={onChange}
        name={props.tagInputName}
        value={value}
        id={props.tagInputId}
        maxLength={props.tagInputMaxLength}
        className={props.tagInputFieldClassName}></input>
      <div className={props.className}>{tagItems}</div>
    </div>
  );
}
export default memo(Tags);
