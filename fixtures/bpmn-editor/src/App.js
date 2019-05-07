import React from 'react';
import './App.css';

import { SVGViewer } from 'react-viewer-components';
import { DropTarget, DragSource, Setup } from 'react-dragdrop';
import { Rect } from 'react-svg-components';

function App() {
  debugger
  Setup();

  return (
    <div className="App">
      <header className="App-header">
        <DragSource index={1} componentType="ITEM">
          <Rect className="wrapper-class-name" />
        </DragSource>
        {/* <DragSource index={1} componentType="ITEM">
          <input type="text" />
        </DragSource> */}
        <div style={{ 'height': '200px', 'background': 'blueviolet' }}>

          <DropTarget componentType="ITEM">
            <SVGViewer >
              <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            </SVGViewer>
          </DropTarget>
        </div>
      </header>
    </div>
  );
}

export default App;
