import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import {useDragDrop, DragDropProvider} from 'reactx-dragdrop';
import {Sidebar} from 'reactx-components';

function App() {
  debugger;
  let {useDrag, useDrop} = useDragDrop();
  return (
    <div>
      <span {...useDrag({})}>Drag Me!</span>
      <span {...useDrag({})} style={{backgroundColor: 'white'}}>
        Drag Me Too!
      </span>
      <br />
      <br />
      <div
        {...useDrop({})}
        style={{
          height: 200,
          width: 200,
          backgroundColor: 'red',
        }}></div>
      <div
        {...useDrop({})}
        style={{height: 200, width: 200, backgroundColor: 'blue'}}
      />
    </div>
  );
}

export default App;
