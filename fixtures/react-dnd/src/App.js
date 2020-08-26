import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import {useDrag, useDrop, DragDropProvider} from 'reactx-dragdrop';
import {Sidebar} from 'reactx-components';

function App() {
  debugger;
  const drop = useDrop();
  const drag = useDrag();
  return (
    <div>
      <span ref={drag}>Drag Me!</span>

      <br />
      <br />

      <div
        ref={drop}
        style={{height: 200, width: 200, backgroundColor: 'blue'}}
      />
    </div>
  );
}

export default App;
