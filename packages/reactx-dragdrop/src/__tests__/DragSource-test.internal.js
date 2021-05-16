/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';
import ReactDOM from 'react-dom';

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
    // wrapper = (
    //   <div>
    //     <DragSource>
    //       <div>Drop Here</div>
    //     </DragSource>
    //   </div>
    // );
    // expect(ReactDOM.render(wrapper, container)).toMatchSnapshot();
  });

  it('should render correctly with provider', () => {
    // const dRef = React.createRef();
    // wrapper = (
    //   <DragDropProvider>
    //     <DragSource>
    //       <span>Drag Me!</span>
    //     </DragSource>
    //   </DragDropProvider>
    // );
    // ReactDOM.render(wrapper, container);
    // dRef.current.dispatchEvent(
    //   document.createEvent('MouseEvents').initEvent('mousedown', true, true),
    // );
    // wrapper = renderer
    //   .create(
    //     <DragDropProvider>
    //       <DragSource ref={dRef}>
    //         <span>Drag Me!</span>
    //       </DragSource>
    //     </DragDropProvider>,
    //   )
    //   .toJSON();
    // expect(wrapper).toMatchSnapshot();
  });

  it('should multiple and nested render correctly', () => {
    // wrapper = (
    //   <div>
    //     <DragSource>
    //       <div>
    //         <span>Drag Me!</span>
    //         <DragSource>
    //           <span>Drag Me!</span>
    //         </DragSource>
    //       </div>
    //     </DragSource>
    //     <DragSource>
    //       <span>Drag Me!</span>
    //     </DragSource>
    //   </div>
    // );
    // expect(ReactDOM.render(wrapper, container)).toMatchSnapshot();
  });

  describe('while running in a browser environment', () => {
    // it('should support onDragStart', () => {
    //   let divRef = React.createRef();
    //   let handleOnDragStart = jest.fn();
    //   function Component() {
    //     return (
    //       <DragDropProvider>
    //         <DragSource ref={divRef} onDragStart={handleOnDragStart}>
    //           <div>Drag me!</div>
    //         </DragSource>
    //       </DragDropProvider>
    //     );
    //   }
    //   ReactDOM.render(<Component />, container);
    //   const mouseOverEvent = document.createEvent('Event');
    //   mouseOverEvent.initEvent('dragstart', true, true);
    //   divRef.current.dispatchEvent(mouseOverEvent);
    //   expect(handleOnDragStart).toHaveBeenCalledTimes(1);
    // });
  });
});
