/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {useCallback, useMemo, memo} from 'react';

type TagPropsType = {
  onClick?: (tag: string) => void;
  onDelete?: (tag: string) => void;
  tag: string;
  className?: string;
  deleteTagClassName?: string;
  deleteTagIconComponent?: React.ReactNode;
};

function createDefaultProps() {
  return {
    className: '',
  };
}

function Tag(userProps: TagPropsType) {
  const defaultProps = useMemo(() => {
    return {...createDefaultProps()};
  }, []);
  const props: TagPropsType = Object.assign(
    {},
    {...defaultProps},
    {...userProps},
  );

  const onClick = useCallback(
    (e) => {
      if (props.onClick) {
        props.onClick(props.tag);
      }
    },
    [props.onClick, props.tag],
  );

  const onDelete = useCallback(
    (e) => {
      if (props.onDelete) {
        props.onDelete(props.tag);
      }
    },
    [props.onDelete, props.tag],
  );

  return (
    <div className={props.className} onKeyDown={onClick} onClick={onClick}>
      <span> {props.tag}</span>
      <a
        onClick={onDelete}
        className={props.deleteTagClassName}
        onKeyDown={onDelete}>
        {props.deleteTagIconComponent}
      </a>
    </div>
  );
}
export default memo(Tag);
