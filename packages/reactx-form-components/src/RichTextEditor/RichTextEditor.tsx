/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Editor, EditorProps, EditorState} from 'draft-js';
import {forwardRef, useState} from 'react';
import 'draft-js/dist/Draft.css';

export interface RTEPropsType extends EditorProps {}

const RTE = forwardRef<Editor, RTEPropsType>((props, ref) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  return (
    <Editor
      {...props}
      ref={ref}
      editorState={editorState}
      onChange={(state) => setEditorState(state)}
    />
  );
});

RTE.displayName = 'RichTextEditor';
export {RTE};
