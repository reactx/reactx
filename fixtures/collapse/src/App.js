import React, {useState} from 'react';
import './App.css';

import {Collapse, Autocomplete} from 'reactx-components';
const items = [
  {id: 'foo', label: 'foo'},
  {id: 'bar', label: 'bar'},
  {id: 'baz', label: 'baz'},
];
export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const change = (item, val) => {
    setValue(val);
  };
  return (
    <div className="container">
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <Collapse isOpened={open}>This is a test</Collapse>

      <Autocomplete
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}>
            {item.label}
          </div>
        )}
        getItemValue={item => item.label}
        shouldItemRender={(item, value) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        items={items}
        value={value}
        onChange={change}
        onSelect={value => setValue(value)}
      />
    </div>
  );
}
