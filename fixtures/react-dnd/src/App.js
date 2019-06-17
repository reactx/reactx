import React, {useState} from 'react';
import './App.css';

import {DragSource, DropTarget, DragDropProvider} from 'react-dragdrop';
import {Sidebar} from 'react-components';

const mstyles = {
  root: {
    fontFamily:
      '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  },
  header: {
    backgroundColor: '#03a9f4',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em',
  },
};

const MaterialTitlePanel = props => {
  const rootStyle = props.style
    ? {...mstyles.root, ...props.style}
    : mstyles.root;

  return (
    <div style={rootStyle}>
      <div style={mstyles.header}>{props.title}</div>
      {props.children}
    </div>
  );
};
const sstyles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};
const SidebarContent = props => {
  const style = props.style
    ? {...sstyles.sidebar, ...props.style}
    : sstyles.sidebar;

  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ind} href="#" style={sstyles.sidebarLink}>
        Mock menu item {ind}
      </a>
    );
  }

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={sstyles.content}>
        <a href="index.html" style={sstyles.sidebarLink}>
          Home
        </a>
        <a href="responsive_example.html" style={sstyles.sidebarLink}>
          Responsive Example
        </a>
        <div style={sstyles.divider} />
        {links}
      </div>
    </MaterialTitlePanel>
  );
};

function renderPropNumber(prop) {
  const setMethod = ev => {
    const newState = {};
    newState[prop] = parseInt(ev.target.value, 10);
    this.setState(newState);
  };

  return (
    <p key={prop}>
      {prop}{' '}
      <input type="number" onChange={setMethod} value={this.state[prop]} />
    </p>
  );
}

// const A = React.createContext({
//   current: null
// });
function App() {
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [pullRight, setPullRight] = useState(false);
  const [checkState, setCheckState] = useState({});

  const sidebar = <SidebarContent />;

  const contentHeader = <span>salaaaam</span>;
  const styles = {
    root: {
      fontFamily:
        '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
      fontWeight: 300,
    },
    header: {
      backgroundColor: '#03a9f4',
      color: 'white',
      padding: '16px',
      fontSize: '1.5em',
    },
  };
  debugger;
  const sidebarProps = {
    sidebar,
    docked,
    open,
    pullRight,
    sidebarClassName: 'custom-sidebar-class',
    contentId: 'custom-sidebar-content-id',
    touch: true,
    // shadow: this.state.shadow,
    // pullRight: this.state.pullRight,
    touchHandleWidth: 20,
    dragToggleDistance: 30,
    // transitions: this.state.transitions,
    onSetOpen: setOpen,
  };
  return (
    <>
      <Sidebar {...sidebarProps}>
        <div title={contentHeader}>
          <MaterialTitlePanel style={styles.content}>
            <DragDropProvider>
              <DragSource category={'itm'} clonable={true}>
                <span>Drag Me!</span>
                {/* <span>Drag Me!</span> */}
                {/* <span>Drag Me!</span> */}
              </DragSource>
              <DragSource category={'itm'}>
                <span style={{backgroundColor: 'white'}}>Drag Me Too!</span>
              </DragSource>
              <DragSource category={'itm2'}>
                <span style={{backgroundColor: 'white'}}>Drag Me Too!</span>
              </DragSource>
              <br />
              <br />
              <br />
              <br />
              <DropTarget>
                <div style={{height: 200, width: 200, backgroundColor: 'red'}}>
                  asljfaskob
                </div>
              </DropTarget>
              <DropTarget>
                <div
                  style={{height: 200, width: 200, backgroundColor: 'blue'}}
                />
              </DropTarget>
            </DragDropProvider>
            <p>
              React Sidebar is a sidebar component for React. It offers the
              following features:
            </p>
            <ul>
              <li>Have the sidebar slide over main content</li>
              <li>Dock the sidebar next to the content</li>
              <li>Touch enabled: swipe to open and close the sidebar</li>
              <li>
                Easy to combine with media queries for auto-docking (
                <a href="responsive_example.html">see example</a>)
              </li>
              <li>
                Sidebar and content passed in as PORCs (Plain Old React
                Components)
              </li>
              <li>
                <a href="https://github.com/balloob/react-sidebar">
                  Source on GitHub
                </a>{' '}
                (MIT license)
              </li>
              <li>Only dependency is React</li>
            </ul>
            <p>
              <a href="https://github.com/balloob/react-sidebar#installation">
                Instructions how to get started.
              </a>
            </p>
            <p>
              <b>Current rendered sidebar properties:</b>
            </p>
            <input
              type="checkbox"
              onChange={ev => setOpen(ev.target.checked)}
              checked={open}
            />
            open
            <input
              type="checkbox"
              onChange={ev => setDocked(ev.target.checked)}
              checked={docked}
            />
            docked
            <input
              type="checkbox"
              onChange={ev => setPullRight(ev.target.checked)}
              checked={pullRight}
            />
            pull right
            {/* 
            {[
              "open",
              "docked",
              "transitions",
              "touch",
              "shadow",
              "pullRight"
            ].map(renderPropCheckbox)} */}
          </MaterialTitlePanel>
        </div>
      </Sidebar>
    </>
  );
}

export default App;
