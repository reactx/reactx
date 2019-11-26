import React, {useState} from 'react';
import './App.css';

import {Collapse} from 'react-components';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="container">
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <Collapse isOpened={open}>This is a test</Collapse>
    </div>
  );
}
