import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.css';
import { Playground } from './pages/playground';

ReactDOM.render(
  <React.StrictMode>
    <div className="theme-default">
      <Playground />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
