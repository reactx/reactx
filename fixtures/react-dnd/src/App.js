import React, { useCallback } from 'react';
import './App.css';

import { DragSource, DropTarget } from 'react-dragdrop';

function App() {
  return (
    <>
    <DragSource>
      <span>Drag Me!</span>
    </DragSource>

    <br />
    <br />
    <br />
    <br />
    <div style={{ height: 200, width: 200, backgroundColor: 'red' }}>
      <DropTarget />
    </div>
    </>
  );
}

export default App;
