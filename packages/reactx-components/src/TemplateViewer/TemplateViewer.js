/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useCallback, useMemo} from 'react';

type TemplateViewerProps = {
  id?: string,
  title?: string,
  name?: string,
  template?: string,
  binding?: any[],

  templateViewerProps: any,
  className?: string,
  forwardedRef: {current: any},
  onChange: (e: ChangeEventHandler<T>) => void,
  renderTemplateViewer?: (props: any) => void,
};

const defaultProps = {
  templateViewerProps: {},
  renderTemplateViewer(props) {
    return (
      <div {...props}>
        <p>No Data or Template Selected</p>
      </div>
    );
  },
};

function TemplateViewerComponent(userProps: TemplateViewerProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);

  const props: TemplateViewerProps = {
    ...defaultMemoizedProps,
    ...userProps,
  };

  return props.renderTemplateViewer({
    ...props.templateViewerProps,
    id: props.id,
    title: props.title,
    name: props.name,
    required: props.required,
    disabled: props.disabled,

    ref: props.forwardedRef,
    className: props.className,
    onChange: props.onChange,
  });
}

const TemplateViewer = React.forwardRef((props, ref) => (
  <TemplateViewerComponent
    forwardedRef={ref}
    {...props}></TemplateViewerComponent>
));
export default TemplateViewer;
