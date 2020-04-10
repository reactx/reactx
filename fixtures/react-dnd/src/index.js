import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DragDropProvider} from 'reactx-dragdrop';

ReactDOM.render(
  <DragDropProvider>
    <App />
  </DragDropProvider>,

  document.getElementById('root')
);
