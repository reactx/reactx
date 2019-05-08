/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

type EditorOptions = {|
  keyboard: any,
  additionalModules: any[],
  moddleExtensions: any,
|};

type EditorProps = {|
  id: string,
  showPropPanel: boolean,
  options: EditorOptions,
  cssViewer: any,
  cssProperty: any,
  onInitialize(): () => {},
|};

export default function Editor(props: EditorProps) {
  let container = props.id || '_bpmnviewer';

  let options = {
    ...props.options,
    container: '#' + container,
  };

  if (props.showPropPanel) {
    options.propertiesPanel = {
      parent: '#' + container + '_property',
    };
  }

  const draggableRef = node => {
    if (node !== null) {
      // This is hacky but makes it work with Rollup.
      let ModelerClass = BpmnModeler.default || BpmnModeler;
      const modeler = new ModelerClass(options);
      if (props.onInitialize) {
        props.onInitialize(modeler);
      }
    }
  };

  return (
    <React.Fragment>
      <div ref={draggableRef} id={container} style={props.cssViewer} />
      {props.showPropPanel && (
        <div id={container + '_property'} style={props.cssProperty} />
      )}
    </React.Fragment>
  );
}
