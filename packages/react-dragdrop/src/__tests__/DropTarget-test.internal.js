/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';
// import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import {DropTarget} from 'react-dragdrop';

configure({adapter: new Adapter()});

// const createEvent = (type, data) => {
//   const event = document.createEvent('MouseEvents');
//   event.initEvent(type, true, true);
//   if (data != null) {
//     Object.entries(data).forEach(([key, value]) => {
//       event[key] = value;
//     });
//   }
//   return event;
// };

describe('while running in a browser environment', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.render(null, container);
    document.body.removeChild(container);
    container = null;
  });

  it('should render correctly', () => {
    // let ref = React.createRef();
    // wrapper = (
    //   <DropTarget>
    //     <div>Drop Here!</div>
    //   </DropTarget>
    // );
    // ReactDOM.render(wrapper, container);
  });
  //use act(...)
  // describe('onDrop', ()=>{
  //   let onDrop,divDragRef,divDropRef;
  //   let events;
  //   beforeEach(() => {
  //     divDragRef = React.createRef();
  //    divDropRef = React.createRef();
  //    events = [];

  //    onDrop =  ()=>{
  //     events.push('dropped')
  //           }

  //       const element = (
  //         <DragDropProvider>
  //       <DragSource>
  //       <div ref={divDragRef}>Drag Me!</div>
  //     </DragSource>
  //     <DropTarget onDrop={onDrop}>
  //       <div ref={divDropRef}>Drop Here!</div>
  //     </DropTarget>
  //   </DragDropProvider>
  //     );
  //     ReactDOM.render(element, container);

  //   });

  // it('should support onDrop', () => {
  //   divDragRef.current.dispatchEvent(createEvent('dragstart'));
  //   divDropRef.current.dispatchEvent(createEvent('drop'));
  //   expect(events).toHaveLength(1);
  // });
  // });
});
