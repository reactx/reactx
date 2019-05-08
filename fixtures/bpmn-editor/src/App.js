import React, {useCallback} from 'react';
import './App.css';

import {Editor} from 'react-bpmn';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import {emptyBpmn} from './empty';

function App() {
  let modeler = null;

  const options = {
    keyboard: {
      bindTo: window,
    },
    additionalModules: [propertiesPanelModule, propertiesProviderModule],
    moddleExtensions: {
      camunda: camundaModdleDescriptor,
    },
  };

  function Init(m: any) {
    modeler = m;
    modeler.importXML(emptyBpmn, error => {
      if (error) {
        return console.log('fail import xml');
      }

      modeler.get('canvas').zoom('fit-viewport');
    });
  }

  const editorContainerRef = useCallback(() => {
    document.getElementsByClassName('bjs-powered-by')[0].remove();
  }, []);

  return (
    <div ref={editorContainerRef}>
      <Editor
        options={options}
        onInitialize={Init}
        // showPropPanel={true}
        cssViewer={{width: '100%', height: '98vh', float: 'left'}}
        // cssProperty={{ width: '25%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}
      />
    </div>
  );
}

export default App;
