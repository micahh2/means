import React from 'react';
import { Graph } from './Graph';

import '../styles/app.scss';

export const App = () => {
  return <div>
    <h1 className="app-title">Project Title</h1>
    <div className="app-main">
      <div className="app-graph">
        <Graph />
      </div>
      <div className="app-form"></div>
    </div>
  </div>;
}
