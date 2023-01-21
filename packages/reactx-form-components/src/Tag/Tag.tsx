/**
 * Copyright (c) Pascal System and ReactX.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {useCallback} from 'react';
import clsx from 'clsx';

interface TagPropsType {
  onClick?: (tag: string | number | readonly string[]) => void;
  onDelete?: (tag: string) => void;
  tag: string;
  className?: string;
  deleteTagClassName?: string;
  deleteTagIconComponent?: React.ReactNode;
}

function Tag(props: TagPropsType) {
  const {onClick, onDelete, className, tag} = props;

  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick(tag);
    }
  }, [onClick, tag]);

  const onDeleteHandler = useCallback(() => {
    if (onDelete) {
      onDelete(tag);
    }
  }, [onDelete, tag]);

  return (
    <div
      className={clsx('x-tag__item', className)}
      onKeyDown={onClickHandler}
      onClick={onClickHandler}>
      <span> {tag}</span>
      <a
        onClick={onDeleteHandler}
        className={props.deleteTagClassName}
        onKeyDown={onDeleteHandler}>
        {props.deleteTagIconComponent}
      </a>
    </div>
  );
}

Tag.defaultProps = {
  className: '',
};
Tag.displayName = 'Tag';
export default Tag;
