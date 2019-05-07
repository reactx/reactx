import React from 'react';
import './App.css';

import {SVGViewer} from 'react-viewer-components';
import {DropTarget, DragSource} from 'react-dragdrop';
import {Rect} from 'react-svg-components';

function App() {

  var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = "purple";
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
  }
}, false);

  return (
    <div className="App">
    <div className="dropzone"> 
  <div id="draggable" draggable="true"> 
    This div is draggable 
  </div> 
</div> 
<div className="dropzone"></div>
<div className="dropzone"></div> 
<div className="dropzone"></div>

      <header className="App-header">
        <DragSource index={1} componentType="ITEM">
          <Rect className="wrapper-class-name" />
        </DragSource>
        <DragSource index={1} componentType="ITEM">
          <input type="text" />
        </DragSource>
        <div style={{'height':'200px', 'background': 'blueviolet'}}>

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
