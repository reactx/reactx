import React from 'react';
import './App.css';

import {SVGViewer} from 'react-viewer-components';
import {DropTarget, DragSource} from 'react-dragdrop';
import {Rect} from 'react-svg-components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragSource index={1} componentType="ITEM">
          <Rect className="wrapper-class-name" />
        </DragSource>
        <DropTarget componentType="ITEM">
          <SVGViewer>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </SVGViewer>
        </DropTarget>

        <DragSource index={1} componentType="ITEM">
          aslkhndasil
          <p>sa'cv;sapckp</p>
        </DragSource>
      </header>
    </div>
  );
}

export default App;
