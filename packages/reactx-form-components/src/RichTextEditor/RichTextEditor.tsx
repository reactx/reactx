/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, { ForwardedRef,forwardRef, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from "dompurify";

import '../assets/elements.rich-text-editor.scss';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export interface RTEPropsType{
    className?:string;
}

const RTEComponent =(props:RTEPropsType) => {
    const { className, ...restProps } = props;
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertedContentToHTML();
    }
    const convertedContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
    const cretaeMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        };
    };

    return (
        <div ref={forawardedRef} className={clsx(
            'x-rte',
            className,
        )}
            {...restProps}>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="x-rte__wrapper"
                editorClassName="x-rte__editor"
                toolbarClassName="x-rte__toolbar"
            />
            <div
                className="x-rte__preview"
            >
            </div>
        </div>
    );
};
const RTE = forwardRef<HTMLDivElement, RTEPropsType>(
    (props, ref) => {
      return <RTEComponent {...props} />;
    },
  );  

RTE.displayName = 'RichTextEditor'
export { RTE };
