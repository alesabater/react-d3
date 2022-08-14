import React from 'react';
import BarChart from './BarChart';
import TreeChart1 from './TreeChart1';
import './App.css';
import myData from './data.json';

var treeData =
  {
    "name": "Top Level",
    "children": [
      { 
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      { "name": "Level 2: B" }
    ]
  };

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TreeChart1 data={treeData}/>
      </header>
    </div>
  );
}

export default App;