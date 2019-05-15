import React, {useCallback, useContext} from 'react';
import './App.css';

import {DragSource, DropTarget, DragDropProvider} from 'react-dragdrop';

// const A = React.createContext({
//   current: null
// });
function App() {
  return (
    <DragDropProvider>
      <DragSource>
        <span>Drag Me!</span>
        <span>Drag Me!</span>
        <span>Drag Me!</span>
      </DragSource>
      <DragSource>
        <span style={{backgroundColor:'white'}}>Drag Me Too!</span>

      </DragSource>
      <br />
      <br />
      <br />
      <br />
      <DropTarget>
        <div style={{height: 200, width: 200, backgroundColor: 'red'}} />
      </DropTarget>
      <DropTarget>
        <div style={{height: 200, width: 200, backgroundColor: 'blue'}} />
      </DropTarget>
    </DragDropProvider>
  );
}

export default App;
