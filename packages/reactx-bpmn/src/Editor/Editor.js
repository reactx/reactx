/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 
 */

import React, {useState} from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
var BpmnViewer = require('bpmn-js/lib/NavigatedViewer');
export default function Editor(props: EditorProps) {
  let container = props.id || '_bpmnviewer';
  const [modeler, setModeler] = useState(null);

  let options = {
    ...props.options,
    container: '#' + container,
  };

  if (props.showPropPanel) {
    options.propertiesPanel = {
      parent: '#' + container + '_property',
    };
  }

  const draggableRef = (node) => {
    if (node !== null) {
      if (!modeler) {
        // This is hacky but makes it work with Rollup.
        var ModelerClass = props.isViewer
          ? BpmnViewer.default || BpmnViewer
          : BpmnModeler.default || BpmnModeler;
        let tempModeler = new ModelerClass(options);
        setModeler(tempModeler);
        if (props.onInitialize) {
          props.onInitialize(tempModeler);
        }
      }
    }
  };

  return (
    <>
      <div ref={draggableRef} id={container} style={props.cssViewer} />
      {props.showPropPanel && (
        <div id={container + '_property'} style={props.cssProperty} />
      )}
    </>
  );
}
